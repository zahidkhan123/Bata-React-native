import {
  GRAPH_SCREEN_REQUEST,
  GRAPH_SCREEN_SUCCESS,
  GRAPH_SCREEN_FAIL,
} from '../constants/graphScreenConstants';
import { SERVER_IP } from '../../config/env';
import axios from 'axios';

export const graphScreenAction = (graph) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GRAPH_SCREEN_REQUEST,
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

    const { data } = await axios.post(
      `${SERVER_IP}/api/graph/chart`,
      graph,
      config
    );
    dispatch({
      type: GRAPH_SCREEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GRAPH_SCREEN_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
