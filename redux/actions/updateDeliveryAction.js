import {
  UPDATE_DELIVERY_REQUEST,
  UPDATE_DELIVERY_SUCCESS,
  UPDATE_DELIVERY_FAIL,
} from '../constants/updateDeliveryConstants';
import axios from 'axios';
import { SERVER_IP } from '../../config/env';
export const updateDeliveryAction =
  (updateStatus) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_DELIVERY_REQUEST,
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
        `${SERVER_IP}/api/order/update_delivery`,
        updateStatus,
        config
      );
      dispatch({
        type: UPDATE_DELIVERY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DELIVERY_FAIL,
        payload:
          error.response && error.response.data.status.message
            ? error.response.data.status.message
            : error.message,
      });
    }
  };
