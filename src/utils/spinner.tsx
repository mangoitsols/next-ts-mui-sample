import { primaryColor } from "@/styles/palatte";
import { CircularProgress, Stack } from "@mui/material";

const Spinner = () => {
  return (
    <Stack
      sx={{
        color: "grey.500",
        alignItems: "center",
        height: "89vh",
        justifyContent: "center",
      }}
      spacing={2}
      direction="row"
    >
      <CircularProgress sx={{ color: primaryColor }} />
    </Stack>
  );
};

export default Spinner;
