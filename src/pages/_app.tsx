import { HandleLogout, localStorageGetter } from "@/api/auth";
import "@/styles/globals.css";
import { theme } from "@/utils/formatter";
import { ThemeProvider } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const token = localStorageGetter("mangomis_login_token");

    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      // Check if token has expired
      if (decodedToken && decodedToken.exp < currentTime) {
        HandleLogout();
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
