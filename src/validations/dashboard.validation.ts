import * as Yup from "yup";

export const updateUserValidations = Yup.object({
  selectedUser: Yup.string().required("Please select valid user"),
});

export const updateUserProjectValidations = Yup.object({
  selectedProject: Yup.string().required("Please select valid project"),
});
