import {
  STORE_PROFILE_REQUEST,
  STORE_PROFILE_SUCCESS,
  STORE_PROFILE_FAIL,
} from '../constants/storeProfileConstants.js';
import { SERVER_IP } from '../../config/env';
import axios from 'axios';

export const storeProfileAction = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_PROFILE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.data.Token}`,
      },
    };

    const { data } = await axios.post(
      `${SERVER_IP}/api/store/profile`,
      userId,
      config
    );
    dispatch({
      type: STORE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STORE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
