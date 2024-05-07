import { screensBackground } from "@/styles/palatte";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      sx={{
        background: screensBackground,
        padding: "15px 0px",
        marginTop: " 20px",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      }}
    >
      {" "}
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          MangoITSolutions
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;
