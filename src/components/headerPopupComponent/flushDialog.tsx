import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { FlushType } from "@/types/header.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { flushValidations } from "@/validations/header.validation";
import ErrorShowing from "../../utils/errorMessage";
import { toast } from "react-toastify";
import { deleteTimeSheetdata } from "@/api/spreadsheet";
import moment from "moment";
import ButtonSpinner from "@/utils/buttonLoader";
import { useRouter } from "next/router";
import { errorMessage } from "@/utils/errorMessages";

interface DialogContent {
  toggle: boolean;
  setToggle: any;
  handleGetTimeSheetData: any;
  handleGetDashboardData: any;
}

export const FlushDialog = ({
  setToggle,
  toggle,
  handleGetTimeSheetData,
  handleGetDashboardData,
}: DialogContent) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FlushType>({ resolver: yupResolver(flushValidations) });

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleClose = () => {
    setToggle(!toggle);
  };

  const router = useRouter();
  const onSubmit: SubmitHandler<FlushType> = async (data) => {
    setLoading(true);
    const result = await deleteTimeSheetdata(
      moment(data?.date).format("YYYY-MM-DD")
    );
    if (result?.status === 200) {
      if (result?.data?.error) {
        toast.warning(result?.data?.error);
      } else {
        toast.success(result?.data?.message);
        if (router.pathname === "/dashboard") {
          handleGetDashboardData();
        } else {
          handleGetTimeSheetData();
        }
      }
    } else {
      toast.error(`${errorMessage.flushDeletedFailed}`);
    }
    setLoading(false);
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={toggle}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select a date to flush the data"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            type="date"
            id="outlined-basic"
            label="Date"
            variant="outlined"
            defaultValue={new Date().toISOString().split("T")[0]}
            {...register("date")}
            margin="normal"
            inputProps={{
              max: new Date().toISOString().split("T")[0],
            }}
            fullWidth
            autoFocus
          />
          {errors && errors.date ? ErrorShowing(errors?.date?.message) : ""}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>

          {!loading ? (
            <Button onClick={handleSubmit(onSubmit)} autoFocus>
              Flush
            </Button>
          ) : (
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled
              variant="outlined"
            >
              <ButtonSpinner /> Flush
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
