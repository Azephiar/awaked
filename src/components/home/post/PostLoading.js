import { Grid, Skeleton } from "@mui/material";
import { useTheme } from "@emotion/react";
export const PostLoading = () => {
  const theme = useTheme();
  return (
    <>
      <Grid item container direction="row" justifyContent="flex-start" wrap="nowrap">
        <Grid item container direction="column" xs="auto" sx={{ marginRight: "3px" }}>
          <Skeleton
            variant="rectangular"
            width="50px"
            height="50px"
            sx={{
              borderRadius: "5px",
              backgroundColor: theme.palette.background.loading,
            }}
          />
        </Grid>

        <Grid item container direction="column">
          <Grid item container direction="row" align="left">
            <Grid item sx={{ marginRight: "3px" }}>
              <Skeleton
                variant="rectangular"
                width="90px"
                height="25px"
                sx={{
                  borderRadius: "5px",
                  backgroundColor: theme.palette.background.loading,
                }}
              />
            </Grid>
            <Grid item>
              <Skeleton
                variant="rectangular"
                width="50px"
                height="25px"
                sx={{
                  borderRadius: "5px",
                  backgroundColor: theme.palette.background.loading,
                }}
              />
            </Grid>
          </Grid>

          <Grid item sx={{ marginTop: "3px", width: "100%" }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="90px"
              sx={{
                borderRadius: "5px",
                backgroundColor: theme.palette.background.loading,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export const UserLoading = () => {
  const theme = useTheme();
  return (
    <>
      <Grid item container direction="row">
        <Grid item container direction="row">
          <Grid item container justifyItems="left" direction="column" xs={2}>
            <Grid item container direction="row">
              <Skeleton
                variant="rectangular"
                width="50px"
                height="50px"
                sx={{
                  borderRadius: "5px",
                  backgroundColor: theme.palette.background.loading,
                }}
              />
            </Grid>
          </Grid>

          <Grid item container direction="column" xs={10} justifyContent="center">
            <Grid item container direction="row" xs="auto" justifyContent="space-between" align="center">
              <Grid item container direction="row" xs="auto" spacing={1}>
                <Grid item>
                  <Skeleton
                    variant="rectangular"
                    width="90px"
                    height="25px"
                    sx={{
                      borderRadius: "5px",
                      backgroundColor: theme.palette.background.loading,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    variant="rectangular"
                    width="50px"
                    height="25px"
                    sx={{
                      borderRadius: "5px",
                      backgroundColor: theme.palette.background.loading,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item sx={{ marginTop: "7px" }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height="70px"
                sx={{
                  borderRadius: "5px",
                  backgroundColor: theme.palette.background.loading,
                }}
              />
            </Grid>
          </Grid>

          <Grid>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="70px"
              sx={{
                borderRadius: "5px",
                backgroundColor: theme.palette.background.loading,
              }}
            />
          </Grid>
        </Grid>
        <Grid sx={{ width: "100%" }} alignContent="right">
          <Skeleton
            variant="rectangular"
            width="140px"
            height="50px"
            sx={{
              borderRadius: "5px",
              backgroundColor: theme.palette.background.loading,
              marginTop: "11px",
              marginLeft: "auto",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
