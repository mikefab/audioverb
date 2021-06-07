import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  state: 1
};

export const explorerSlice = createSlice({
  name: 'explorer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setExplorerState: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const selectState = (state) => state.explorer.state;
export const { setExplorerState } = explorerSlice.actions;
export default explorerSlice.reducer;
