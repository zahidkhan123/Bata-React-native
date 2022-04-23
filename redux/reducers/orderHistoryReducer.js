import {
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAIL,
} from '../constants/orderHistoryConstants';

export const orderHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_HISTORY_REQUEST:
      return { loading: true };
    case ORDER_HISTORY_SUCCESS:
      return {
        loading: false,
        historyInfo: action.payload,
      };
    case ORDER_HISTORY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
