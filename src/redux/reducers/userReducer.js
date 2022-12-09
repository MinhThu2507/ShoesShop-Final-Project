import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ACCESS_TOKEN,
  getStore,
  getStoreJson,
  PROFILE,
  saveStore,
  saveStoreJson,
  USER_LOGIN,
} from "../../util/config";

const initialState = {
  user: getStoreJson(USER_LOGIN),
  getProfileUser: null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    profileAction: (state, action) => {
      state.getProfileUser = action.payload;
    },
    checkout: (state, action) => {
      state.getProfileUser = action.payload;

    }
  },
});

export const { loginAction, profileAction } = userReducer.actions;

export default userReducer.reducer;

// async action
export const setOrderDetailApi = (order) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/order",
        method: "POST",
        data: order,
      });
      console.log(result)
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginApi = (user) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/signin",
        method: "POST",
        data: user,
      });
      dispatch(loginAction(result.data.content));

      // lưu vào local storage
      saveStore(ACCESS_TOKEN, result.data.content.accessToken);
      saveStoreJson(USER_LOGIN, result.data.content);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProfileApi = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/getProfile",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
        },
      });
      // SAU khi lấy dữ liệu từ api về đưa lên reducer qua action creator
      dispatch(profileAction(result.data.content));
      saveStoreJson(PROFILE, result.data.content);
      console.log(result)
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfile = (user) => {
  return async (dispatch) => {
    try {
        const result = await axios({
          url: 'https://shop.cyberlearn.vn/api/Users/updateProfile',
          method: 'POST',
          data: user,
          headers: {
            Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`
          }
        })
        console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
}

export const signUpApi = (user) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/signup",
        method: "POST",
        data: user,
      });
      console.log(result)
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginFacebook = (token) => {
  return async (dispatch) => {
    try {
        const result = await axios({
          url:'https://shop.cyberlearn.vn/api/Users/facebooklogin',
          method: 'POST',
          data: {
            facebookToken: token
          },
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer" + ACCESS_TOKEN
            },
        })
        dispatch(loginAction(result.data.content));

        saveStore(ACCESS_TOKEN, result.data.content.accessToken);
        saveStoreJson(USER_LOGIN, result.data.content);

        console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
}

