import {
  TRACK_ORDER_REQUEST,
  TRACK_ORDER_SUCCESS,
  TRACK_ORDER_FAIL,
} from '../constants/trackOrderConstants';

export const TrackOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case TRACK_ORDER_REQUEST:
      return { loading: true };
    case TRACK_ORDER_SUCCESS:
      return {
        loading: false,
        trackOrder: action.payload,
      };
    case TRACK_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
