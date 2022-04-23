import {
  WALLET_LEDGER_REQUEST,
  WALLET_LEDGER_SUCCESS,
  WALLET_LEDGER_FAIL,
} from '../constants/ledgerConstants';

export const ledgerReducer = (state = {}, action) => {
  switch (action.type) {
    case WALLET_LEDGER_REQUEST:
      return { loading: true };
    case WALLET_LEDGER_SUCCESS:
      return {
        loading: false,
        ledger: action.payload,
      };
    case WALLET_LEDGER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
