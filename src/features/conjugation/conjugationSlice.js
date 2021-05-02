import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  conjugation: [],
  status: 'idle',
};


export const conjugationSlice = createSlice({
  name: 'conjugation',
  initialState,

  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setConjugation: (state, action) => {
      console.log(action.payload)
      state.conjugation = action.payload;
    },
  },

});

export const { setConjugation } = conjugationSlice.actions;
export const selectConjugation = (state) => state.conjugation.conjugation;
export default conjugationSlice.reducer;
