import {
  ORDER_SCHEDULE_REQUEST,
  ORDER_SCHEDULE_SUCCESS,
  ORDER_SCHEDULE_FAIL,
} from '../constants/orderScheduleConstants';

export const orderScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SCHEDULE_REQUEST:
      return { loading: true };
    case ORDER_SCHEDULE_SUCCESS:
      return {
        loading: false,
        scheduleInfo: action.payload,
      };
    case ORDER_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
