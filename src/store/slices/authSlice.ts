import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginWithEmail, loginWithGoogle, logout, registerUser } from '../../services/firebase';
import { AuthState } from '../../types';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const result = await loginWithEmail(email, password);
      const { uid, email: userEmail, displayName, photoURL } = result.user;
      return { uid, email: userEmail, displayName, photoURL };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const result = await loginWithGoogle();
      const { uid, email, displayName, photoURL } = result.user;
      return { uid, email, displayName, photoURL };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Google login failed');
    }
  }
);

export const registerWithEmail = createAsyncThunk(
  'auth/registerWithEmail',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const result = await registerUser(email, password);
      const { uid, email: userEmail, displayName, photoURL } = result.user;
      return { uid, email: userEmail, displayName, photoURL };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Registration failed');
    }
  }
);

export const signOutUser = createAsyncThunk('auth/signOut', async () => {
  await logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState['user']>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithEmail.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signInWithEmail.fulfilled, (state, action) => { state.user = action.payload; state.loading = false; })
      .addCase(signInWithEmail.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; state.user = null; })
      .addCase(signInWithGoogle.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signInWithGoogle.fulfilled, (state, action) => { state.user = action.payload; state.loading = false; })
      .addCase(signInWithGoogle.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; state.user = null; })
      .addCase(registerWithEmail.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerWithEmail.fulfilled, (state, action) => { state.user = action.payload; state.loading = false; })
      .addCase(registerWithEmail.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; state.user = null; })
      .addCase(signOutUser.fulfilled, (state) => { state.user = null; state.loading = false; });
  },
});

export const { setUser, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;