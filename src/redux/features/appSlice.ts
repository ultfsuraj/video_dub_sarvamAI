import { Dimensions } from '@/components/customUI/AudioTrack';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  fileName: string;
  scripts: Array<ScriptType>;
  isScriptLoading: boolean;
  dubScripts: Array<ScriptType>;
  isTranslationLoading: boolean;
  clips: ClipType[];
  isAudioLoading: boolean;
  dubClips: ClipType[];
  isDubAudioLoading: boolean;
};

const initialState: AppState = {
  fileName: 'Unknown.mp4',
  scripts: [],
  isScriptLoading: false,
  dubScripts: [],
  isTranslationLoading: false,
  clips: [],
  isAudioLoading: false,
  dubClips: [],
  isDubAudioLoading: false,
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

export const fetchAudioClip = createAsyncThunk('fetchAudioClip', async () => {
  const res = await fetch('/api/audioclip');
  const data = await res.json();
  return data.clips;
});

export const fetchDubAudioClips = createAsyncThunk('fetchDubAudioClips', async (lang: string) => {
  const res = await fetch(`/api/dubaudioclips/${lang}`);
  const data = await res.json();
  return data.clips;
});

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
    },
    resetDubClips: (state) => {
      state.dubClips = [];
    },
    updateDubClip: (state, action: PayloadAction<{ index: number; dimensions: Dimensions }>) => {
      const { index, dimensions } = action.payload;
      state.dubClips[index] = dimensions;
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
      state.isTranslationLoading = false;
    });
    builder.addCase(fetchAudioClip.pending, (state) => {
      state.isAudioLoading = true;
    });
    builder.addCase(fetchAudioClip.fulfilled, (state, action) => {
      state.isAudioLoading = false;
      state.clips = action.payload;
    });
    builder.addCase(fetchAudioClip.rejected, (state, action) => {
      console.log('loading audioclip error', action.payload);
      state.isAudioLoading = false;
    });
    builder.addCase(fetchDubAudioClips.pending, (state) => {
      state.isDubAudioLoading = true;
    });
    builder.addCase(fetchDubAudioClips.fulfilled, (state, action) => {
      state.isDubAudioLoading = false;
      state.dubClips = action.payload;
    });
    builder.addCase(fetchDubAudioClips.rejected, (state, action) => {
      console.log('loading dubaudioclips error', action.payload);
      state.isDubAudioLoading = false;
    });
  },
});

export const { setFileName, resetDubClips, updateDubClip } = appSlice.actions;
export default appSlice.reducer;
