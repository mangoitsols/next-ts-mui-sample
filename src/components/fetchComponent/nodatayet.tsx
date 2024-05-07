import { Box, Typography } from "@mui/material";
import styles from "../../styles/Dashboard.module.css";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { secondaryColor } from "@/styles/palatte";

export const NoDataYet = () => {
  return (
    <Box className={styles.nodatayet}>
      <SentimentDissatisfiedIcon fontSize="large" color={"disabled"} />
      <Typography color={secondaryColor}>No Data Added For Today</Typography>
    </Box>
  );
};
