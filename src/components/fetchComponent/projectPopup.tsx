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
import { updateUserProjectValidations } from "@/validations/dashboard.validation";
import { updateProjectType } from "../../types/fetchDetails.type";
import CloseIcon from "@mui/icons-material/Close";
import { CreatemasterProject } from "@/api/masterProject";
import { toast } from "react-toastify";
import { FetchTableContect } from "@/pages/fetchtable";
import { errorMessage } from "@/utils/errorMessages";

interface DialogContent {
  toggle: boolean;
  setToggle: any;
  projectInfo: any;
  projectData: any;
  project_data: any;
}

export const ProjectConfirmModel = ({
  setToggle,
  toggle,
  projectInfo,
  projectData,
  project_data,
}: DialogContent) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<updateProjectType>({
    resolver: yupResolver(updateUserProjectValidations),
  });

  const handleClose = () => {
    setToggle(!toggle);
    setValue("selectedProject", "");
    setUserUpdate("");
    setConfirmToggle(false);
  };

  const { spreadData, setSpreadData, setYesterdaySheetArray }: any =
    React.useContext(FetchTableContect);
  const [confirmToggle, setConfirmToggle] = React.useState<boolean>(false);
  const [userUpdate, setUserUpdate] = React.useState<string>("");

  const onSubmit: SubmitHandler<updateProjectType> = async (submitData) => {
    const updatedSpreadData = spreadData?.map((data: any) => {
      if (
        data["S.No"] === projectInfo["S.No"] &&
        data.Project !== submitData.selectedProject
      ) {
        return { ...data, Project: submitData.selectedProject };
      } else {
        return data;
      }
    });

    setValue("selectedProject", "");
    setUserUpdate("");
    setSpreadData(updatedSpreadData);
    setYesterdaySheetArray(updatedSpreadData);
    handleClose();
  };

  const handleCreateProject = async () => {
    const reqData = {
      project_name: projectInfo?.["Project"],
    };
    const result = await CreatemasterProject(reqData);
    if (result?.status === 200) {
      toast.success(
        `${projectInfo?.["Project"]} ${errorMessage.projectCreated}`
      );
      project_data();
    } else {
      toast.error(errorMessage.projectCreationFailed);
    }
    handleClose();
  };
  const handleChange = (event: SelectChangeEvent) => {
    setUserUpdate(event.target.value as string);
  };

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
              ? "Correct the project information"
              : "Please choose correct project"}
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
              Are you want to create this project
              <Typography
                component="span"
                sx={{ fontWeight: "bold", marginLeft: "10px" }}
              >
                {projectInfo && projectInfo.Project}
              </Typography>
            </DialogContentText>
          ) : (
            <FormControl fullWidth margin="dense">
              <InputLabel id="demo-simple-select-label">
                Select Project
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userUpdate}
                label="Select Project"
                {...register("selectedProject")}
                onChange={handleChange}
              >
                {projectData?.map((project: any) => (
                  <MenuItem key={project.Id} value={project.Project_name}>
                    {project.Project_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {errors && errors.selectedProject && !userUpdate
            ? ErrorShowing(errors?.selectedProject?.message)
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
                disabled={projectData && projectData.length > 0 ? false : true}
              >
                Update
              </Button>
              <Button onClick={handleCreateProject}>Create</Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setConfirmToggle(!confirmToggle);
                }}
              >
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
