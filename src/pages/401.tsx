import { Box, Button, IconButton, Typography } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import styles from "../styles/401.module.css";

const UnauthorizedUser = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <Box className={styles.main_content}>
      <IconButton>
        <SentimentDissatisfiedIcon className={styles.sad_icon} />
      </IconButton>
      <Typography className={styles.typography_style}>
        You are not authorized
      </Typography>
      <Button
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        variant="contained"
        className={styles.back_button}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default UnauthorizedUser;
