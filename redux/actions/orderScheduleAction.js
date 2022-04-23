import {
  ORDER_SCHEDULE_REQUEST,
  ORDER_SCHEDULE_SUCCESS,
  ORDER_SCHEDULE_FAIL,
} from '../constants/orderScheduleConstants';
import { SERVER_IP } from '../../config/env';
import axios from 'axios';

export const OrderScheduleAction = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_SCHEDULE_REQUEST,
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
      `${SERVER_IP}/api/order/schedule`,
      userId,
      config
    );

    dispatch({
      type: ORDER_SCHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_SCHEDULE_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
