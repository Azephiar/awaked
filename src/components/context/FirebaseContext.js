import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect, useContext, createContext, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, query, getDocs, orderBy, limit, startAfter, onSnapshot } from "firebase/firestore";
import { CeramicContext } from "./CeramicContext";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGjxmhEIDKlMqNKttEP_5gWJEWCl5ySAw",
  authDomain: "awakedweb3.firebaseapp.com",
  databaseURL: "https://awakedweb3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "awakedweb3",
  storageBucket: "awakedweb3.appspot.com",
  messagingSenderId: "5571569331",
  appId: "1:5571569331:web:77147225568e886e6df2c6",
  measurementId: "G-0P8BD7TDLS",
};

const dbConfig = {
  numberPerPage: 10,
  postCollection: "posts",
  postListCollection: "postsList",
};

export const FirebaseContext = createContext({
  app: {},
  db: {},
  auth: {},
  isLoadingPosts: false,
  hasMorePosts: true,
  awakedPostList: [],
  newPost: async () => {},
  startPostListener: async () => {},
  getMorePosts: async () => {},
});

export const FirebaseContextProvider = (props) => {
  const ceramic = useContext(CeramicContext);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = getAuth();

  const [awakedPostList, setAwakedPostList] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [snapshotCursor, setSnapshotCursor] = useState();
  const [firstLoad, setFirstLoad] = useState(false);
  //React state variables are not available inside listeners. For this reason we need a ref.
  const snapshotCursorRef = useRef(snapshotCursor);

  useEffect(() => {
    const authenticateFirebaseUser = async () => {
      await signInWithEmailAndPassword(auth, process.env.NEXT_PUBLIC_FIREBASE_EMAIL, process.env.NEXT_PUBLIC_FIREBASE_PASSWORD);
    };
    authenticateFirebaseUser();
  }, []);

  //Update ref when a new snapShot cursor is set.
  useEffect(() => {
    snapshotCursorRef.current = snapshotCursor;
  }, [snapshotCursor]);

  //Start listening to incoming posts. It's also used to fetch the first post in which the cursor used in the function 'getMorePosts' is also set.
  const startPostListener = () => {
    const q = query(collection(db, dbConfig.postCollection), orderBy("timestamp", "desc"), limit(dbConfig.numberPerPage));

    onSnapshot(q, async (snapshot) => {
      setIsLoadingPosts(true);

      let streamIds = [];

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          streamIds.push(change.doc.data());
        }
      });

      let newPosts = await ceramic.getAwakedPostListFromFirebasePostList(streamIds);

      awakedPostList = [...new Set([...newPosts, ...awakedPostList])];

      setAwakedPostList((awakedPostList) => [...newPosts, ...awakedPostList]);
      setIsLoadingPosts(false);
      setFirstLoad(true);
      //If this is the first call set the cursor to the last document.
      //In this way the function 'getMorePosts' can know from which post fetch the next data.
      if (snapshotCursorRef.current === undefined) {
        setSnapshotCursor(snapshot.docs[snapshot.docs.length - 1]);
      }
    });
  };

  const getMorePosts = async () => {
    if (!snapshotCursorRef.current || !hasMorePosts) {
      return;
    }

    let q = query(
      collection(db, dbConfig.postCollection),
      orderBy("timestamp", "desc"),
      startAfter(snapshotCursorRef.current),
      limit(dbConfig.numberPerPage)
    );

    setIsLoadingPosts(true);
    const snapshot = await getDocs(q);

    let streamIds = [];
    snapshot.forEach((doc) => {
      streamIds.push(doc.data());
    });

    let oldPosts = await ceramic.getAwakedPostListFromFirebasePostList(streamIds);

    if (snapshot.docs.length < dbConfig.numberPerPage) {
      setHasMorePosts(false);
    }

    setAwakedPostList((awakedPostList) => [...awakedPostList, ...oldPosts]);
    setIsLoadingPosts(false);

    //Update cursor to last current doc.
    setSnapshotCursor(snapshot.docs[snapshot.docs.length - 1]);
  };

  const newPost = async (postListStreamID, postStreamID, did, timestamp) => {
    let postDoc = await writePostToFirebase(postListStreamID, postStreamID, did, timestamp);
    let postListDoc = await writePostListsToFirebase(postListStreamID, did, timestamp);
  };

  const writePostToFirebase = async (postListStreamID, postStreamID, did, timestamp) => {
    try {
      const doc = await addDoc(collection(db, dbConfig.postCollection), {
        postsListStreamUrl: postListStreamID.toUrl().toString(),
        postsListStreamId: postListStreamID.toString(),
        postStreamUrl: postStreamID.toUrl().toString(),
        postStreamId: postStreamID.toString(),
        did: did,
        timestamp: timestamp,
      });
      return doc;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const writePostListsToFirebase = async (postListStreamID, did, timestamp) => {
    try {
      const doc = await addDoc(collection(db, dbConfig.postListCollection), {
        postsListStreamUrl: postListStreamID.toUrl().toString(),
        postsListStreamId: postListStreamID.toString(),
        did: did,
        timestamp: timestamp,
      });
      return doc;
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // await set(ref(db, "postLists/" + postListStreamID.toString()), {
    //   postsListStreamUrl: postListStreamID.toUrl(),
    //   did: did,
    //   timestamp: timestamp,
    // });
  };

  const value = {
    app,
    db,
    auth,
    isLoadingPosts,
    awakedPostList,
    hasMorePosts,
    newPost,
    getMorePosts,
    startPostListener,
  };

  return <FirebaseContext.Provider value={value}>{props.children}</FirebaseContext.Provider>;
};
