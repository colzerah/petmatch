import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HomeStateProps } from '../../dtos/reduxDTO';
import { Advertisements } from '../../dtos/advertisementsDTO';

export const initialState = {
  advertisements: [],
} as HomeStateProps;

const home = createSlice({
  name: 'homeState',
  initialState: initialState,
  reducers: {
    setAddAdvertisements: (state, action: PayloadAction<Advertisements[]>) => ({
      ...state,
      advertisements: action.payload,
    }),
  },
});

export const homeActions = home.actions;

export default home.reducer;
