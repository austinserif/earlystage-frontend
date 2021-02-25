import * as types from './questionsActionTypes';
const initialState = {
  categories: {
    financials: {},
    corporateGovernance: {},
    management: {},
    market: {},
    other: {}
  },
  isLoadingNewQuestion: false,
  newQuestionError: null
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_QUESTIONS_CACHE:
      return {
        categories: {
          financials: {},
          corporateGovernance: {},
          management: {},
          market: {},
          other: {}
        },
        isLoadingNewQuestion: false,
        newQuestionError: null
      };
    case types.SET_IS_LOADING_NEW_QUESTION:
      return {
        ...state,
        isLoadingNewQuestion: true
      };
    case types.CLEAR_IS_LOADING_NEW_QUESTION:
      return {
        ...state,
        isLoadingNewQuestion: false
      };
    case types.SET_NEW_QUESTION_ERROR:
      return {
        ...state,
        newQuestionError: action.payload.message // sets message string from action payload as the current error
      };
    case types.CLEAR_NEW_QUESTION_ERROR:
      return {
        ...state,
        newQuestionError: null // clears any current error messages back to null
      };
    case types.SET_MANY_QUESTIONS: // for each category overwite/merge any prexisting questions in state with new action payload
      return {
        ...state,
        categories: {
          financials: {
            ...state.categories.financials,
            ...action.payload.financials
          },
          corporateGovernance: {
            ...state.categories.corporateGovernance,
            ...action.payload.corporateGovernance
          },
          management: {
            ...state.categories.management,
            ...action.payload.management
          },
          market: {
            ...state.categories.market,
            ...action.payload.market
          },
          other: {
            ...state.categories.other,
            ...action.payload.other
          }
        }
      };

    /**
     *  payload: {
     *      question: <Object>,
     *      category: <String>,
     *      qid: <String>
     *  };
     */
    case types.SET_ONE_QUESTION:
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.category]: {
            ...state.categories[action.payload.category],
            [action.payload.qid]: action.payload.question
          }
        }
      };
    default:
      return state;
  }
};

export default questionsReducer;
