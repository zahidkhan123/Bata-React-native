import {
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
} from '../constants/editProfileConstants';
import { SERVER_IP } from '../../config/env';
import axios from 'axios';

export const EditProfileAction = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_PROFILE_REQUEST,
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

    const { data } = await axios.put(
      `${SERVER_IP}/api/user/profileupdate`,
      userId,
      config
    );

    dispatch({
      type: EDIT_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
