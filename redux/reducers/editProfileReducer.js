import {
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
} from '../constants/editProfileConstants';

export const EditProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PROFILE_REQUEST:
      return { loading: true };
    case EDIT_PROFILE_SUCCESS:
      return {
        loading: false,
        editProfile: action.payload,
      };
    case EDIT_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
