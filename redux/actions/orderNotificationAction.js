import {
  ORDER_NOTIFICATION_REQUEST,
  ORDER_NOTIFICATION_SUCCESS,
  ORDER_NOTIFICATION_FAIL,
} from '../constants/orderNotificationConstants';
import { SERVER_IP } from '../../config/env';
import axios from 'axios';

export const orderNotificationAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_NOTIFICATION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        //   Authorization: `${userInfo.data.Token}`,
      },
    };
    const { data } = await axios.get(
      `${SERVER_IP}/api/user/notification`,
      config
    );

    dispatch({
      type: ORDER_NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_NOTIFICATION_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
