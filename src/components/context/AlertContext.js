import { useState, createContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useContext } from "react";

export const AlertContext = createContext({
  state: {},
  show: (message, serverity) => {},
  close: () => {},
});

export const AlertContextProvider = (props) => {
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const show = (message, severity) => {
    setState({
      open: true,
      message: message,
      severity: severity,
    });
  };

  const close = () => {
    setState({ ...state, open: false });
  };

  const value = { state, show, close };
  return (
    <AlertContext.Provider value={value}>
      <AlertMessage />
      {props.children}
    </AlertContext.Provider>
  );
};

const AlertMessage = () => {
  const { state, close } = useContext(AlertContext);

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      open={state.open}
      autoHideDuration={3500}
      onClose={() => close()}
      sx={{ marginBottom: "30px" }}
    >
      <Alert
        onClose={() => close()}
        severity={state.severity}
        sx={{ width: "80%" }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
};
