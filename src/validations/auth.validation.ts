import * as Yup from "yup";

const passwordRules =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[ -\/:-@\[-\`{-~]).{8,}$/;
const emailRules = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameRules = /^[A-Za-z ]*$/;

export const userRegisterValidations = Yup.object({
  first_name: Yup.string()
    .required("First name is a required field")
    .min(3, "First name must be at least 3 characters")
    .matches(nameRules, "Please enter valid name"),
  last_name: Yup.string()
    .required("Last name is a required field")
    .min(3, "Last name must be at least 3 characters")
    .matches(nameRules, "Please enter valid name"),
  email: Yup.string()
    .required("Email is a required field")
    .matches(emailRules, "Email must be a valid email")
    .email("Email must be a valid email"),
  password: Yup.string()
    .required("Password is a required field")
    .min(
      8,
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special character"
    )
    .matches(
      passwordRules,
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special character"
    ),
});

export const userLoginValidations = Yup.object({
  email: Yup.string()
    .required("Email is a required field")
    .matches(emailRules, "Email must be a valid email")
    .email("Email must be a valid email"),
  password: Yup.string().required("Password is a required field"),
});
