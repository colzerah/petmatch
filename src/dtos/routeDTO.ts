export type RootStackParamList = RootStackAuthList &
  RootStackHomeList &
  RootStackRegisterList;

type RootStackAuthList = {
  Login: undefined;
  ResetPassword: undefined;
  Register: undefined;
};

type RootStackHomeList = {
  Home: undefined;
  Pets: undefined;
};

type RootStackRegisterList = {
  RegisterRoutes: undefined;
  RegisterType: undefined;
  RegisterForm: undefined;
  RegisterValidation: undefined;
};
