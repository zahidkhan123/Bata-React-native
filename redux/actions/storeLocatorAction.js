import {
  STORE_LOCATOR_FAIL,
  STORE_LOCATOR_SUCCESS,
  STORE_LOCATOR_REQUEST,
} from '../constants/storeLocatorConstants';
import { SERVER_IP } from '../../config/env';
import axios from 'axios';

export const storeLocatorAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_LOCATOR_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.data.Token}`,
      },
    };

    const { data } = await axios.get(`${SERVER_IP}/api/store/locator`, config);

    dispatch({
      type: STORE_LOCATOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STORE_LOCATOR_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
