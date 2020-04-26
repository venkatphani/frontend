import actionTypes from "../action_types";

export const initialState = {
  deployments: [],
  errors: {},
};

export default function (state = initialState, action) {
  const deploymentsModified = JSON.parse(JSON.stringify(state.deployments));
  switch (action.type) {
    case actionTypes.GET_ALL_DEPLOYMENTS_SUCCESS:
      return {
        ...state,
        deployments: action.payload,
      };

    case actionTypes.CREATE_DEPLOYMENT_SUCCESS: {
      deploymentsModified.push(action.payload);
      return {
        ...state,
        deployments: deploymentsModified,
      };
    }

    case actionTypes.DELETE_DEPLOYMENT_SUCCESS: {
      const { _id: deletedDeploymentId } = action.payload;
      const newDeploymentData = deploymentsModified.filter((deployment) => {
        const { _id: deploymentId } = deployment;
        return deploymentId !== deletedDeploymentId;
      });
      return {
        ...state,
        deployments: newDeploymentData,
      };
    }

    case actionTypes.HANDLE_ERROR: {
      let errors = {};
      if (typeof action.payload === "string") {
        errors.message = action.payload;
      } else {
        errors = action.payload;
      }
      return {
        ...state,
        errors,
      };
    }

    default:
      return state;
  }
}
