import {
  STORE_PROFILE_REQUEST,
  STORE_PROFILE_SUCCESS,
  STORE_PROFILE_FAIL,
} from '../constants/storeProfileConstants.js';

export const storeProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_PROFILE_REQUEST:
      return { loading: true };
    case STORE_PROFILE_SUCCESS:
      return {
        loading: false,
        profileData: action.payload,
      };
    case STORE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
