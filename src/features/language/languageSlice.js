import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: localStorage.getItem('language') || null
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLanguage: (state, action) => {
      const language = action.payload.toLowerCase()
      localStorage.setItem('language', language)
      state.language = language;
    },
  }
});

export const selectLanguage = (state) => state.language.language;
export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
