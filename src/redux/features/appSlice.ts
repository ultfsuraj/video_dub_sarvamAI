import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  dummyVar: string;
};

const initialState: AppState = {
  dummyVar: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    dummy: (state, action: PayloadAction<string>) => {
      state.dummyVar = action.payload;
    },
  },
});

export const { dummy } = appSlice.actions;
export default appSlice.reducer;
