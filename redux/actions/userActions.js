import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants';
import axios from 'axios';
import { SERVER_IP } from '../../config/env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (user_data, navigation) => async (dispatch) => {
  AsyncStorage.removeItem('userLogin');
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${SERVER_IP}/api/login/authenticate`,
      user_data,
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    navigation.navigate('Dashboard', { screen: 'Dashboard' });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};

export const verifyPin = (otpCode) => async (dispatch) => {
  try {
    dispatch({
      type: VERIFY_OTP_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    await axios.post(`${SERVER_IP}/api/login/verifyotp`, otpCode, config);
    dispatch({
      type: VERIFY_OTP_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_OTP_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};

export const ChangePasswordAction =
  (changedUser) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHANGE_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };
      await axios.post(
        `${SERVER_IP}/api/login/changepassword`,
        changedUser,
        config
      );

      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.status.message
            ? error.response.data.status.message
            : error.message,
      });
    }
  };
export const forgotPassword = (mobileNumber) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const { data } = await axios.post(
      `${SERVER_IP}/api/login/forgotpassword`,
      mobileNumber,
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
export const logout = (navigation) => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  AsyncStorage.clear();
  navigation.push('Login');
};
