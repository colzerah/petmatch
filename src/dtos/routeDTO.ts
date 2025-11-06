export type RootTabParamList = {
  HomeScreens: undefined;
  ActivityScreens: undefined;
  MatchScreens: undefined;
  WorksScreens: undefined;
  ProfilesScreens: undefined;
};

export type RootStackParamsList = RootStackHomeList &
  RootStackMatchList &
  RootStackActivityList &
  RootStackProfileList &
  RootStackWorkList &
  RootStackAuthList;

type RootStackAuthList = {
  Login: undefined;
  Register: undefined;
};

type RootStackHomeList = {
  Home: undefined;
  Model: undefined;
  Model2: undefined;
  Example: undefined;
  Map: undefined;
};

type RootStackMatchList = {
  Match: undefined;
};

type RootStackActivityList = {
  Activities: undefined;
  Stores: undefined;
  Veterinarians: undefined;
  Adoptions: undefined;
};

type RootStackProfileList = {
  Profile: undefined;
};

type RootStackWorkList = {
  Works: undefined;
  Jobs: undefined;
};
