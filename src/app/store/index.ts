import { configureStore } from "@reduxjs/toolkit";
//导出是user.reducer但是写的可以合在一起
import userReducer from './features/userSlice'

export const store = configureStore({
  reducer: {
    userReducer,
  },

});

/**
 * @description: 封装redux, 参考：https://github.com/wpcodevo/nextjs13-redux-toolkit
 * @return {*}
 * @Date: 2023-06-05 18:36:43
 */
