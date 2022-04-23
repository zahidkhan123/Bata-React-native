import {
  FEEDBACK_SEND_REQUEST,
  FEEDBACK_SEND_SUCCESS,
  FEEDBACK_SEND_FAIL,
} from '../constants/feedbackConstants';
export const feedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case FEEDBACK_SEND_REQUEST:
      return { loading: true };
    case FEEDBACK_SEND_SUCCESS:
      return {
        loading: false,
        feedback: action.payload,
      };
    case FEEDBACK_SEND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
