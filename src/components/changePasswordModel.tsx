import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, Grid, IconButton, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordValidations } from "@/validations/header.validation";
import ErrorShowing from "../utils/errorMessage";
import { changePasswordType } from "@/types/auth.type";
import { HandleChangepassword } from "@/api/auth";
import { toast } from "react-toastify";
import { authUser } from "@/utils/authUser";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ButtonSpinner from "@/utils/buttonLoader";
import { errorMessage } from "@/utils/errorMessages";

interface DialogContent {
  toggle: boolean;
  setToggle: any;
}

export const PassweordDialog = ({ setToggle, toggle }: DialogContent) => {
  const authuser: any = authUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<changePasswordType>({
    resolver: yupResolver(passwordValidations),
  });

  const handleClose = () => {
    setToggle(false);
    setValue("old_password", "");
    setValue("password", "");
    setValue("confirmPassword", "");
    reset();
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowCOnfirmPassword] = React.useState(false);
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowCOnfirmPassword((show) => !show);

  const onSubmit: SubmitHandler<changePasswordType> = async (data) => {
    setLoading(true);
    const result = await HandleChangepassword(data, authuser?.id);
    if (result?.status === 200) {
      toast.success(errorMessage.passwordChanged);
      handleClose();
    } else {
      toast.error(result.response.data.message);
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={toggle}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change Password"}</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type={showOldPassword ? "text" : "password"}
                id="outlined-basic"
                label="Old Password"
                variant="outlined"
                {...register("old_password")}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowOldPassword}
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                fullWidth
                autoFocus
              />
              {errors && errors.old_password
                ? ErrorShowing(errors?.old_password?.message)
                : ""}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                {...register("password")}
                type={showPassword ? "text" : "password"}
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
                fullWidth
                autoFocus
              />
              {errors && errors.password
                ? ErrorShowing(errors?.password?.message)
                : ""}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                {...register("confirmPassword")}
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              {errors && errors.confirmPassword
                ? ErrorShowing(errors?.confirmPassword?.message)
                : ""}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {!loading ? (
            <Button onClick={handleSubmit(onSubmit)} autoFocus>
              SAVE
            </Button>
          ) : (
            <Button onClick={handleSubmit(onSubmit)} disabled>
              <ButtonSpinner /> SAVE
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
