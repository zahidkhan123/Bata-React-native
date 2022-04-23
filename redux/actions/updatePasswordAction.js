import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from '../constants/updatePasswordConstants';
import axios from 'axios';
import { SERVER_IP } from '../../config/env';
export const updatePasswordAction =
  (updateUser) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_PASSWORD_REQUEST,
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

      await axios.put(
        `${SERVER_IP}/api/user/updatepassword`,
        updateUser,
        config
      );

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.status.message
            ? error.response.data.status.message
            : error.message,
      });
    }
  };
