import * as types from './workspacesActionTypes';

const initialState = {
  isLoading: false,
  newWorkspaceErrMsg: null,
  workspaces: {}
};

const workspacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_WORKSPACES:
      return {
        ...state,
        workspaces: {
          ...state.workspaces,
          ...action.payload
        }
      };
    case types.SET_ONE_WORKSPACE:
      return {
        ...state,
        workspaces: {
          ...state.workspaces,
          [action.payload.key]: action.payload.value
        }
      };

    case types.UPDATE_COMPONENT_ANSWER:
      return {
        ...state,
        workspaces: {
          ...state.workspaces,
          [action.payload.workspaceId]: {
            ...state.workspaces[action.payload.workspaceId],
            fullComponentData: {
              ...state.workspaces[action.payload.workspaceId].fullComponentData,
              [action.payload.componentId]: {
                ...state.workspaces[action.payload.workspaceId].fullComponentData[
                  action.payload.componentId
                ],
                answer: action.payload.answer
              }
            }
          }
        }
      };

    case types.SET_WORKSPACE_COMPONENT:
      return {
        ...state,
        workspaces: {
          ...state.workspaces,
          [action.payload.workspaceId]: {
            ...state.workspaces[action.payload.workspaceId],
            components: [
              ...state.workspaces[action.payload.workspaceId].components,
              action.payload.componentId
            ],
            fullComponentData: {
              ...state.workspaces[action.payload.workspaceId].fullComponentData,
              [action.payload.componentId]: {
                ...action.payload.component
              }
            }
          }
        }
      };

    case types.UPDATE_WORKSPACE_COMPONENTS:
      return {
        ...state,
        workspaces: {
          ...state.workspaces,
          [action.payload.workspaceId]: {
            ...state.workspaces[action.payload.workspaceId],
            fullComponentData: {
              ...action.payload.components
            }
          }
        }
      };

    case types.UPDATE_WORKSPACE_COMPONENT:
      return {
        ...state,
        workspaces: {
          ...state.workspaces,
          [action.payload.workspaceId]: {
            ...state.workspaces[action.payload.workspaceId],
            fullComponentData: {
              ...state.workspaces[action.paylaod.workspaceId].fullComponentData,
              [action.payload.componentId]: {
                ...state.workspaces[action.payload.workspaceId].fullComponentData[
                  action.payload.componentId
                ],
                answer: action.payload.answer,
                readiness: action.payload.readiness
              }
            }
          }
        }
      };

    case types.SET_NEW_WORKSPACE_ERROR_MSG:
      return {
        ...state,
        newWorkspaceErrMsg: action.payload.message
      };

    case types.CLEAR_NEW_WORKSPACE_ERROR_MSG:
      return {
        ...state,
        newWorkspaceErrMsg: null
      };

    case types.CLEAR_WORKSPACES:
      return {
        ...initialState
      };

    /**
     * expects `payload: { _id: <String>, entity: { name: <String>, domain: <String> } }`
     * `name` and `domain` are optional, but `entity` must be an object.
     * **/
    case types.UPDATE_WORKSPACE_ENTITY_DETAILS:
      return {
        ...state,
        workspaces: {
          ...state.workspaces,
          [action.payload._id]: {
            ...state.workspaces[action.payload._id],
            entity: {
              ...state.workspaces[action.payload._id].entity,
              ...action.payload.entity // this line requires entity to be an object, even if empty
            }
          }
        }
      };

    /**
     * expects `payload: { _id: <String> }`
     */
    case types.DELETE_WORKSPACE: {
      const workspacesCopy = state.workspaces; // copy workspaces from state into new object
      delete workspacesCopy[action.payload._id]; // delete key-value pair
      return {
        ...state,
        workspaces: {
          ...workspacesCopy
        }
      };
    }

    case types.SET_WORKSPACE_IS_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case types.CLEAR_WORKSPACE_IS_LOADING:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

export default workspacesReducer;
