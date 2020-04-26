import axios from "axios";
import config from "../config";
import actionTypes from "../action_types";

export function getAllDeployments() {
  return async (dispatch) => {
    axios
      .get(`${config.api_base_url}/deployment/all`)
      .then((response) => {
        dispatch({
          type: actionTypes.GET_ALL_DEPLOYMENTS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        handleError(err, dispatch);
      });
  };
}

export function createDeployment(templateName, version, url) {
  return async (dispatch) => {
    axios
      .post(`${config.api_base_url}/deployment/`, { templateName, version, url })
      .then((response) => {
        dispatch({
          type: actionTypes.CREATE_DEPLOYMENT_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        handleError(err, dispatch);
      });
  };
}

export function deleteDeployment(id) {
  return async (dispatch) => {
    axios
      .delete(`${config.api_base_url}/deployment/`, { data: { id } })
      .then((response) => {
        dispatch({
          type: actionTypes.DELETE_DEPLOYMENT_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        handleError(err, dispatch);
      });
  };
}

function handleError(err, dispatch) {
  if (err.response.data) {
    const { error } = err.response.data;
    dispatch({
      type: actionTypes.HANDLE_ERROR,
      payload: error,
    });
  } else {
    dispatch({
      type: actionTypes.HANDLE_ERROR,
      payload: err.message,
    });
  }
}
