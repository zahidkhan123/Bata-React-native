import {
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAIL,
} from '../constants/orderHistoryConstants';
import { SERVER_IP } from '../../config/env';
import axios from 'axios';

export const OrderHistoryAction = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_HISTORY_REQUEST,
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
      `${SERVER_IP}/api/order/history`,
      userId,
      config
    );

    dispatch({
      type: ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_HISTORY_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
