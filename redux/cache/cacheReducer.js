import * as types from './cacheActionTypes';

const initialState = {
  metadata: {
    hasCachedUser: false,
    processingInitialLoad: false,
    initialLoadProcessingStage: null
  }
};

const cacheReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_HAS_CACHED_USER:
      return {
        ...state,
        metadata: {
          hasCachedUser: true
        }
      };
    case types.CLEAR_HAS_CACHED_USER:
      return {
        metadata: {
          hasCachedUser: false
        }
      };
    case types.UPDATE_INITIAL_LOAD_PROCESSING_STAGE:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          initialLoadProcessingStage: action.payload.stage
        }
      };
    case types.SET_PROCESSING_INITIAL_LOAD:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          processingInitialLoad: true
        }
      };
    case types.CLEAR_PROCESSING_INITIAL_LOAD:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          processingInitialLoad: false,
          initialLoadProcessingStage: null
        }
      };
    default:
      return state;
  }
};

export default cacheReducer;
