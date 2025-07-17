import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  fileName: string;
  scripts: Array<ScriptType>;
  isScriptLoading: boolean;
  dubScripts: Array<ScriptType>;
  isTranslationLoading: boolean;
};

const initialState: AppState = {
  fileName: 'Unknown.mp4',
  scripts: [],
  isScriptLoading: false,
  dubScripts: [],
  isTranslationLoading: false,
};

export const fetchScripts = createAsyncThunk('fetchScripts', async () => {
  const res = await fetch('/api/transcripts');
  const data = await res.json();
  return data.scripts;
});

export const fetchDubScripts = createAsyncThunk('fetchDubScripts', async (lang: string) => {
  const res = await fetch(`/api/translations/${lang}`);
  const data = await res.json();
  return data.scripts;
});

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchScripts.pending, (state) => {
      state.isScriptLoading = true;
    });
    builder.addCase(fetchScripts.fulfilled, (state, action) => {
      state.isScriptLoading = false;
      state.scripts = action.payload;
    });
    builder.addCase(fetchScripts.rejected, (state, action) => {
      console.log('loading scripts error', action.payload);
      state.isScriptLoading = false;
    });
    builder.addCase(fetchDubScripts.pending, (state) => {
      state.isTranslationLoading = true;
    });
    builder.addCase(fetchDubScripts.fulfilled, (state, action) => {
      state.isTranslationLoading = false;
      state.dubScripts = action.payload;
    });
    builder.addCase(fetchDubScripts.rejected, (state, action) => {
      console.log('loading scripts error', action.payload);
      state.isScriptLoading = false;
    });
  },
});

export const { setFileName } = appSlice.actions;
export default appSlice.reducer;
