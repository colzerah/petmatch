import { createSlice } from '@reduxjs/toolkit';
import { darkTheme } from '../../theme/darkTheme';
import { lightTheme } from '../../theme/lightTheme';

interface ThemeState {
  isDarkMode: boolean;
  theme: any; //verificar como importar a tipagem correta do tema
}

const initialState: ThemeState = {
  isDarkMode: false,
  theme: lightTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? darkTheme : lightTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
