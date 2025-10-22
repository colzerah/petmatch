import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PetStateProps } from '../../dtos/reduxDTO';

export const initialState = {
  user: {
    name: 'Dyego',
    email: '',
    phone: null,
  },
} as PetStateProps;

const pet = createSlice({
  name: 'petState',
  initialState: initialState,
  reducers: {
    setUpdateUser: (
      state,
      action: PayloadAction<{ phone: number; email: string }>,
    ) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const petActions = pet.actions;

export default pet.reducer;
