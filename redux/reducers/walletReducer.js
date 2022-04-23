import {
  WALLET_TRANS_REQUEST,
  WALLET_TRANS_SUCCESS,
  WALLET_TRANS_FAIL,
} from '../constants/walletConstants';

export const walletTransReducer = (state = {}, action) => {
  switch (action.type) {
    case WALLET_TRANS_REQUEST:
      return { loading: true };
    case WALLET_TRANS_SUCCESS:
      return {
        loading: false,
        walletTransactions: action.payload,
      };
    case WALLET_TRANS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
