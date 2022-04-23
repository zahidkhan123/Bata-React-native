import {
  STORE_LOCATOR_FAIL,
  STORE_LOCATOR_REQUEST,
  STORE_LOCATOR_SUCCESS,
} from '../constants/storeLocatorConstants';

export const storeLocatorReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_LOCATOR_REQUEST:
      return { loading: true };
    case STORE_LOCATOR_SUCCESS:
      return {
        loading: false,
        locators: action.payload,
      };
    case STORE_LOCATOR_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
