import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// armazenar dados de usuário

type ProfileType = {
  id: number;
  name:
    | "PETSHOP"
    | "VETERINARY_SHOP"
    | "HOTEL"
    | "DAYCARE"
    | "DOGWALK"
    | "PETSITTING"
    | "COACH"
    | "VETERINARIAN";
};

interface UserProfile {
  id: number;
  name: string;
  companyName: string;
  cnpj: string;
  email: string;
  whatsApp: string;
  phone: string;
  url?: string;
  profileType: ProfileType;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  fullName: string;
  birthDate: string;
  birthDateFormatted: string;
  whatsApp: string;
  cpf: string;
  email: string;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
  profiles: UserProfile[];
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User;
  userActiveProfile: UserProfile | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: {} as User,
  userActiveProfile: null,
};

// login, logout e mudar de perfil

const auth = createSlice({
  name: "authState",
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: () => {
      return initialState;
    },
    switchProfile: (state, action: PayloadAction<number>) => {
      const selectedProfile = state.user?.profiles.find(
        (profile) => profile.id === action.payload,
      );

      state.userActiveProfile = !!selectedProfile ? selectedProfile : null;
    },
  },
});

export const { login, logout, addUser, addToken, switchProfile } = auth.actions;

export default auth.reducer;
