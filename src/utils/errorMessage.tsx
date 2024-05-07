import { Typography } from "@mui/material";

const ErrorShowing = (errorMessage: string | undefined) => {
  return (
    <Typography variant="body2" color={"error"} gutterBottom>
      {errorMessage}{" "}
    </Typography>
  );
};

export default ErrorShowing;
