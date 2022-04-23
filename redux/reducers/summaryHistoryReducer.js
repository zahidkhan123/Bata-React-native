import {
  SUMMARY_HISTORY_REQUEST,
  SUMMARY_HISTORY_SUCCESS,
  SUMMARY_HISTORY_FAIL,
} from '../constants/summaryHistoryConstants';

export const summaryHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case SUMMARY_HISTORY_REQUEST:
      return { loading: true };
    case SUMMARY_HISTORY_SUCCESS:
      return {
        loading: false,
        summaryHistoryInfo: action.payload,
      };
    case SUMMARY_HISTORY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
