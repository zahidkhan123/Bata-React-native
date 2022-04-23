import {
  SUMMARY_HISTORY_REQUEST,
  SUMMARY_HISTORY_SUCCESS,
  SUMMARY_HISTORY_FAIL,
} from '../constants/summaryHistoryConstants';
import { SERVER_IP } from '../../config/env';
import axios from 'axios';

export const SummaryHistoryAction = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUMMARY_HISTORY_REQUEST,
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
      `${SERVER_IP}/api/order/summery`,
      userId,
      config
    );

    dispatch({
      type: SUMMARY_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUMMARY_HISTORY_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
