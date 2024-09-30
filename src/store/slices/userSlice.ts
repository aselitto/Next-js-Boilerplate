// src/store/slices/userSlice.ts 2

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { User } from '@/types/User';

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    // Optionally, add more reducers if needed 1
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
