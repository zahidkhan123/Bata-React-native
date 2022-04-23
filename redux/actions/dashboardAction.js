import {
  META_DATA_FAIL,
  META_DATA_REQUEST,
  META_DATA_SUCCESS,
  SUGGESTED_PRODUCT_SUCCESS,
  SUGGESTED_PRODUCT_REQUEST,
  SUGGESTED_PRODUCT_FAIL,
} from '../constants/dashboardConstants';
import axios from 'axios';
import { SERVER_IP } from '../../config/env';

export const banners = () => async (dispatch) => {
  try {
    dispatch({
      type: META_DATA_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`${SERVER_IP}/api/meta_data`, config);
    dispatch({
      type: META_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: META_DATA_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};

export const suggestedProducts =
  (suggestedData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUGGESTED_PRODUCT_REQUEST,
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
        `${SERVER_IP}/api/order/suggested_order`,
        suggestedData,
        config
      );

      dispatch({
        type: SUGGESTED_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUGGESTED_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.status.message
            ? error.response.data.status.message
            : 'Something went wrong',
      });
    }
  };
