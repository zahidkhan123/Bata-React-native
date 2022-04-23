import {
  FEEDBACK_SEND_REQUEST,
  FEEDBACK_SEND_SUCCESS,
  FEEDBACK_SEND_FAIL,
} from '../constants/feedbackConstants';
import axios from 'axios';

import { SERVER_IP } from '../../config/env';
export const feedbackAction = (reviewData) => async (dispatch, getState) => {
  try {
    dispatch({ type: FEEDBACK_SEND_REQUEST });
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
      `${SERVER_IP}/api/user/feedback`,
      reviewData,
      config
    );
    dispatch({ type: FEEDBACK_SEND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FEEDBACK_SEND_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
