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
    
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload)
    },
    quit: (state) => {
      state.token = '';
      localStorage.setItem('token', '')
    },
  },
});

export const {
  login, quit
} = user.actions;

export default user.reducer;