import { User } from "@/common/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

if (typeof window !== "undefined") {
  const saved = localStorage.getItem("auth");
  if (saved) {
    Object.assign(initialState, JSON.parse(saved));
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }
    },
    loadCredentials: (state) => {
      if (typeof window === "undefined") return;
      const saved = localStorage.getItem("auth");
      if (saved) {
        const parsed = JSON.parse(saved);
        state.user = parsed.user;
        state.token = parsed.token;
      }
    },
  },
});

export const { setCredentials, logout, loadCredentials } = authSlice.actions;
export default authSlice.reducer;
