import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  DialogContentText,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import ErrorShowing from "../../utils/errorMessage";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { updateUserValidations } from "@/validations/dashboard.validation";
import { updateUserType } from "../../types/fetchDetails.type";
import CloseIcon from "@mui/icons-material/Close";
import { CreatemasterDeveloper } from "@/api/masterdevloper";
import { toast } from "react-toastify";

import { FetchTableContect } from "@/pages/fetchtable";
import { errorMessage } from "@/utils/errorMessages";

interface DialogContent {
  toggle: boolean;
  setToggle: any;
  userInfo: any;
  developerArray: any;
  developer_data: any;
}

export const UserConfirmModel = ({
  setToggle,
  toggle,
  userInfo,
  developerArray,
  developer_data,
}: DialogContent) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<updateUserType>({ resolver: yupResolver(updateUserValidations) });
  const handleClose = () => {
    setToggle(!toggle);
    setValue("selectedUser", "");
    setUserUpdate("");
    setConfirmToggle(false);
  };

  const { spreadData, setSpreadData, setYesterdaySheetArray }: any =
    React.useContext(FetchTableContect);
  const [confirmToggle, setConfirmToggle] = React.useState<boolean>(false);
  const [userUpdate, setUserUpdate] = React.useState<string>("");

  const onSubmit: SubmitHandler<updateUserType> = async (submitData) => {
    const updatedSpreadData = spreadData?.map((data: any) => {
      if (
        data["S.No"] === userInfo["S.No"] &&
        data["Team Member Name"] !== submitData.selectedUser
      ) {
        return { ...data, "Team Member Name": submitData.selectedUser };
      } else {
        return data;
      }
    });

    setValue("selectedUser", "");
    setUserUpdate("");
    setSpreadData(updatedSpreadData);
    setYesterdaySheetArray(updatedSpreadData);
    handleClose();
  };

  const handleCreateDeveloper = async () => {
    const reqData = {
      name: userInfo?.["Team Member Name"],
      team_lead: false,
    };
    const result = await CreatemasterDeveloper(reqData);
    if (result?.status === 200) {
      toast.success(
        `${userInfo?.["Team Member Name"]} ${errorMessage.developerCreated}`
      );
      developer_data();
    } else {
      toast.error(errorMessage.developerCreationFailed);
    }
    handleClose();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setUserUpdate(event.target.value as string);
  };
  const processedIds = new Set();
  const developerArrayForDropdown = spreadData
    ?.map((item: any) => {
      const developer = developerArray?.find(
        (user: any) =>
          (user.Name === item["Team Member Name"] && user.TL === "false") ||
          (user.Name === item["Team Member Name"] && user.TL === "true")
      );
      if (developer && !processedIds.has(developer.Id)) {
        processedIds.add(developer.Id);
        return developer;
      }
      return undefined;
    })
    .filter((item: any) => item !== undefined);

  return (
    <React.Fragment>
      <Dialog
        open={toggle}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box>
          <DialogTitle id="alert-dialog-title">
            {!confirmToggle
              ? "Correct the developer information"
              : "Please choose correct developer"}
          </DialogTitle>
          {!confirmToggle && (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <Divider />

        <DialogContent sx={{ padding: "10px 20px" }}>
          {!confirmToggle ? (
            <DialogContentText
              id="alert-dialog-description"
              sx={{ margin: "20px 0px" }}
            >
              Are you want to create this developer
              <Typography
                component="span"
                sx={{ fontWeight: "bold", marginLeft: "10px" }}
              >
                {userInfo && userInfo["Team Member Name"]}
              </Typography>
            </DialogContentText>
          ) : (
            <FormControl fullWidth margin="dense">
              <InputLabel id="demo-simple-select-label">Select User</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userUpdate}
                label="Select User"
                {...register("selectedUser")}
                onChange={handleChange}
              >
                {developerArrayForDropdown
                  ?.filter((tl: any) => tl.Name)
                  ?.map((tl: any) => (
                    <MenuItem key={tl.Id} value={tl.Name}>
                      {tl.Name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}

          {errors && errors.selectedUser && !userUpdate
            ? ErrorShowing(errors?.selectedUser?.message)
            : ""}
        </DialogContent>
        <DialogActions>
          {!confirmToggle ? (
            <>
              <Button
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setConfirmToggle(!confirmToggle)}
                disabled={
                  developerArrayForDropdown &&
                  developerArrayForDropdown.length > 0
                    ? false
                    : true
                }
              >
                Update
              </Button>
              <Button onClick={handleCreateDeveloper}>Create</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setConfirmToggle(!confirmToggle)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit(onSubmit)}>Update</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
