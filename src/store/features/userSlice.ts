import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  token: string;
};

const initialState: UserState = {
  token: ''
} 

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    quit: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {
  login, quit
} = user.actions;

export default user.reducer;