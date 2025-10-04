interface LoginForm {
  email: String;
  password: String;
}

interface RegisterForm {
  email: String;
  name: String;
  password: String;
}

interface CategoryForm {
  name: string | undefined;
}

export type { LoginForm, RegisterForm, CategoryForm };