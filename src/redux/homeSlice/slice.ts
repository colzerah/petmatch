import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  news: any[];
  infos: any[];
}

const initialState: HomeState = {
  news: [],
  infos: [],
};

const home = createSlice({
  name: "homeState",
  initialState: initialState,
  reducers: {
    addNews: (state, action: PayloadAction<any[]>) => {
      state.news = action.payload;
    },
    addInfos: (state, action: PayloadAction<any[]>) => {
      state.infos = action.payload;
    },
  },
});

export const { addNews, addInfos } = home.actions;

export default home.reducer;
