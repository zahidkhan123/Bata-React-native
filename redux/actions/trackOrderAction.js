import {
  TRACK_ORDER_REQUEST,
  TRACK_ORDER_SUCCESS,
  TRACK_ORDER_FAIL,
} from '../constants/trackOrderConstants';
import { SERVER_IP } from '../../config/env';
import axios from 'axios';
export const TrackOrderAction = (orderID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRACK_ORDER_REQUEST,
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
      `${SERVER_IP}/api/order/track_history`,
      orderID,
      config
    );

    dispatch({
      type: TRACK_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRACK_ORDER_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
