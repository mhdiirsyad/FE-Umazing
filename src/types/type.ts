interface LoginForm {
  email: String;
  password: String;
}

interface RegisterForm {
  email: String;
  name: String;
  password: String;
}

export type { LoginForm, RegisterForm };