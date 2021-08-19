import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: localStorage.getItem('langauge') || null
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLanguage: (state, action) => {
      localStorage.setItem('language', action.payload)
      state.language = action.payload;
    },
  }
});

export const selectLanguage = (state) => state.language.language;
export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
