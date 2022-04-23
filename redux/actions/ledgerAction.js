import {
  WALLET_LEDGER_REQUEST,
  WALLET_LEDGER_SUCCESS,
  WALLET_LEDGER_FAIL,
} from '../constants/ledgerConstants';
import { SERVER_IP } from '../../config/env';
import axios from 'axios';

export const ledgerAction = (ledgerData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WALLET_LEDGER_REQUEST,
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
      `${SERVER_IP}/api/financial/ledgerhistory`,
      ledgerData,
      config
    );

    dispatch({
      type: WALLET_LEDGER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WALLET_LEDGER_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
