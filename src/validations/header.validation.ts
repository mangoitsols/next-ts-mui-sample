import * as Yup from "yup";

const urlRegex =
  /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/;

const passwordrules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

export const configValidations = Yup.object({
  url: Yup.string()
    .required("URL is a required field")
    .matches(urlRegex, "Please enter valid url"),
});

export const flushValidations = Yup.object({
  date: Yup.date().required("Date is a required field"),
});

export const passwordValidations = Yup.object({
  old_password: Yup.string().required("Old Password is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .matches(
      passwordrules,
      "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is a required field")
    .oneOf(
      [Yup.ref("password"), ""],
      "Password and Confirm Password are not match"
    ),
});
