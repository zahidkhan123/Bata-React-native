import {
  WALLET_TRANS_REQUEST,
  WALLET_TRANS_SUCCESS,
  WALLET_TRANS_FAIL,
} from '../constants/walletConstants';
import { SERVER_IP } from '../../config/env';
import axios from 'axios';

export const walletTransaction = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WALLET_TRANS_REQUEST,
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
      `${SERVER_IP}/api/financial/mywallet`,
      userId,
      config
    );

    dispatch({
      type: WALLET_TRANS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WALLET_TRANS_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
