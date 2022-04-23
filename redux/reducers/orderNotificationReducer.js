import {
  ORDER_NOTIFICATION_REQUEST,
  ORDER_NOTIFICATION_SUCCESS,
  ORDER_NOTIFICATION_FAIL,
} from '../constants/orderNotificationConstants.js';

export const orderNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_NOTIFICATION_REQUEST:
      return { loading: true };
    case ORDER_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        Notification: action.payload,
      };
    case ORDER_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
