import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { userLoginValidations } from "@/validations/auth.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginType } from "../../types/auth.type";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorShowing from "@/utils/errorMessage";
import { primaryColor } from "@/styles/palatte";
import {
  HandleLogin,
  localStorageGetter,
  localStorageSetter,
} from "../../api/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import ButtonSpinner from "@/utils/buttonLoader";
import { errorMessage } from "@/utils/errorMessages";
const defaultTheme = createTheme();

export default function SignIn() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({ resolver: yupResolver(userLoginValidations) });

  const onSubmit: SubmitHandler<loginType> = async (data, e) => {
    setLoading(true);
    const result = await HandleLogin(data);
    if (result?.status === 200) {
      localStorageSetter("mangomis_login_token", result?.data?.loginToken);
      const userDet: any = jwtDecode(result?.data?.loginToken);
      localStorageSetter("mangomis_user_details", JSON.stringify(userDet));

      toast.success(errorMessage.loginSuccess);
      if (userDet.role === "SuperAdmin") {
        setTimeout(() => {
          router.push("/dashboard");
        }, 700);
      } else {
        setTimeout(() => {
          router.push("/fetchtable");
        }, 700);
      }
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const getToken = localStorageGetter("mangomis_login_token");
    if (getToken) {
      router.push("/fetchtable");
    }
  }, [router]);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            padding: "40px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            component={"img"}
            src="/logo/logo.svg"
            alt="website_logo"
            width={200}
            height={100}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  {...register("email")}
                  autoComplete="email"
                  autoFocus
                />
                {errors && errors.email
                  ? ErrorShowing(errors?.email?.message)
                  : ""}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("password")}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                {errors && errors.password
                  ? ErrorShowing(errors?.password?.message)
                  : ""}
              </Grid>
            </Grid>
            {!loading ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: primaryColor,
                  opacity: 0.9,
                  "&:hover": {
                    background: primaryColor,
                    opacity: 1,
                  },
                }}
              >
                Sign In
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                <ButtonSpinner /> Sign In
              </Button>
            )}
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}
