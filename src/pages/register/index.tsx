import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { registerType } from "../../types/auth.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegisterValidations } from "@/validations/auth.validation";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorShowing from "@/utils/errorMessage";
import { primaryColor } from "@/styles/palatte";
import { useRouter } from "next/router";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  // const router = useRouter()
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<registerType>({ resolver: yupResolver(userRegisterValidations) });
  // const onSubmit: SubmitHandler<registerType> = async (data) => {
  // };
  // React.useEffect(() => {
  //   router.push('/login');
  // }, [])
  // const [showPassword, setShowPassword] = React.useState(false);
  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  // return (
  //   <ThemeProvider theme={defaultTheme}>
  //     <Container component="main" maxWidth="xs">
  //       <CssBaseline />
  //       <Box
  //         sx={{
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "center",
  //           position: "absolute",
  //           top: "50%",
  //           left: "50%",
  //           maxWidth: "444px",
  //           transform: "translate(-50%, -50%)",
  //         }}
  //       >
  //         <Box
  //           component={"img"}
  //           src="/logo/logo.svg"
  //           alt="website_logo"
  //           width={100}
  //           height={50}
  //           sx={{ display: { xs: "none", md: "flex" } }}
  //         />
  //         <Typography component="h1" variant="h5">
  //           Sign up
  //         </Typography>
  //         <Box
  //           component="form"
  //           noValidate
  //           onSubmit={handleSubmit(onSubmit)}
  //           sx={{ mt: 3 }}
  //         >
  //           <Grid container spacing={2}>
  //             <Grid item xs={12}>
  //               <TextField
  //                 autoComplete="given-name"
  //                 {...register("first_name")}
  //                 required
  //                 fullWidth
  //                 id="firstName"
  //                 label="First Name"
  //                 autoFocus
  //               />
  //               {errors && errors.first_name
  //                 ? ErrorShowing(errors?.first_name?.message)
  //                 : ""}
  //             </Grid>
  //             <Grid item xs={12}>
  //               <TextField
  //                 required
  //                 fullWidth
  //                 id="lastName"
  //                 label="Last Name"
  //                 {...register("last_name")}
  //                 autoComplete="last-name"
  //               />
  //               {errors && errors.last_name
  //                 ? ErrorShowing(errors?.last_name?.message)
  //                 : ""}
  //             </Grid>
  //             <Grid item xs={12}>
  //               <TextField
  //                 required
  //                 fullWidth
  //                 id="email"
  //                 label="Email Address"
  //                 {...register("email")}
  //                 autoComplete="email"
  //               />
  //               {errors && errors.email
  //                 ? ErrorShowing(errors?.email?.message)
  //                 : ""}
  //             </Grid>
  //             <Grid item xs={12}>
  //               <TextField
  //                 required
  //                 fullWidth
  //                 {...register("password")}
  //                 label="Password"
  //                 type={showPassword ? "text" : "password"}
  //                 id="password"
  //                 autoComplete="new-password"
  //                 InputProps={{
  //                   endAdornment: (
  //                     <IconButton
  //                       aria-label="toggle password visibility"
  //                       onClick={handleClickShowPassword}
  //                       edge="end"
  //                     >
  //                       {showPassword ? <VisibilityOff /> : <Visibility />}
  //                     </IconButton>
  //                   ),
  //                 }}
  //               />
  //               {errors && errors.password
  //                 ? ErrorShowing(errors?.password?.message)
  //                 : ""}
  //             </Grid>
  //             {/* <Grid item xs={12}>
  //               <FormControlLabel
  //                 control={
  //                   <Checkbox value="allowExtraEmails" color="primary" />
  //                 }
  //                 label="I want to receive inspiration, marketing promotions and updates via email."
  //               />
  //             </Grid> */}
  //           </Grid>
  //           <Button
  //             type="submit"
  //             fullWidth
  //             variant="contained"
  //             sx={{ mt: 3, mb: 2, background: primaryColor }}
  //           >
  //             Sign Up
  //           </Button>
  //           <Grid container justifyContent="flex-end">
  //             <Grid item>
  //               <Link
  //                 href="/login"
  //                 style={{ fontSize: "0.875rem", color: "#1976d2" }}
  //               >
  //                 Already have an account? Sign in
  //               </Link>
  //             </Grid>
  //           </Grid>
  //         </Box>
  //       </Box>
  //     </Container>
  //   </ThemeProvider>
  // );
}
