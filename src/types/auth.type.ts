export type registerType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type loginType = {
  email: string;
  password: string;
};

export type changePasswordType = {
  old_password: string;
  password: string;
  confirmPassword: string;
};
