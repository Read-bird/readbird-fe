import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUser {
  id: number;
  email: string;
  nickname: string;
  profile: string | null;
}
interface IUserState {
  accessToken: string;
  userInfo: IUser | null;
}

const initialState: IUserState = {
  accessToken: localStorage.getItem('rb-access-token') ?? '',
  userInfo: null
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.accessToken = '';
      state.userInfo = null;
    }
  }
});

export const { setAccessToken, setUserInfo, clearUserInfo } = userSlice.actions;

export const userStore = userSlice.reducer;
