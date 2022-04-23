import {
  BRAND_FILTER_REQUEST,
  BRAND_FILTER_SUCCESS,
  BRAND_FILTER_FAIL,
  CATEGORY_FILTER_REQUEST,
  CATEGORY_FILTER_SUCCESS,
  CATEGORY_FILTER_FAIL,
} from '../constants/searchFilterConstants';
import axios from 'axios';
import { SERVER_IP } from '../../config/env';

// SEARCH BY BRAND ACTION

export const BrandFilterAction = (reviewData) => async (dispatch, getState) => {
  try {
    dispatch({ type: BRAND_FILTER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.data.Token}`,
      },
    };
    const { data } = await axios.get(
      `${SERVER_IP}/api/product/brand`,
      reviewData,
      config
    );
    dispatch({ type: BRAND_FILTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BRAND_FILTER_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
// SEARCH BY CATEGORY ACTION
export const CategoryFilterAction = (catData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_FILTER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.data.Token}`,
      },
    };

    const { data } = await axios.get(
      `${SERVER_IP}/api/product/group`,
      catData,
      config
    );
    dispatch({ type: CATEGORY_FILTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORY_FILTER_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
