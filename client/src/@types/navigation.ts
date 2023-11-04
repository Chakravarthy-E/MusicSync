interface NewUserResponse {
  id?: string;
  name: string;
  email: string;
}

export type AuthStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  ForgettenPassword: undefined;
  Verification: {userInfo: NewUserResponse};
};
