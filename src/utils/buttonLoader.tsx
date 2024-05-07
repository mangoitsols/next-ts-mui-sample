import { primaryColor } from "@/styles/palatte";
import { CircularProgress, Stack } from "@mui/material";

const ButtonSpinner = () => {
  return (
    <Stack
      sx={{
        color: "grey.500",
        marginRight: "12px",
      }}
      spacing={2}
      direction="row"
    >
      <CircularProgress sx={{ color: primaryColor }} size={15} />
    </Stack>
  );
};

export default ButtonSpinner;
