import * as types from './questionsActionTypes'; // imports all action types under prefix `types`
import axios from 'axios';
import mapCategories from '../../../utils/mapCategories';
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * Sets `qid` string (question id) and
 * `question` object into redux state as a
 * key-value pair.
 *
 * @param {String} qid
 * @param {Object} question
 */
const setOneQuestion = (qid, question, category) => ({
  type: types.SET_ONE_QUESTION,
  payload: {
    question,
    qid,
    category
  }
});

/**
 * Sets an error message for the new question form
 * @param {String} message
 */
const setNewQuestionError = (message) => ({
  type: types.SET_NEW_QUESTION_ERROR,
  payload: {
    message
  }
});

/**
 * Clears current questions cache and resets to
 * initial questions state
 */
export const clearQuestionsCache = () => ({
  type: types.CLEAR_QUESTIONS_CACHE
});

/** Clears error message for new question form by setting property back to null */
export const clearNewQuestionError = () => ({ type: types.CLEAR_NEW_QUESTION_ERROR }); // will need to get called from page/component

/** Sets loading status to true */
const setIsLoadingNewQuestion = () => ({ type: types.SET_IS_LOADING_NEW_QUESTION });

/** Sets loading status back to false */
const clearIsLoadingNewQuestion = () => ({ type: types.CLEAR_IS_LOADING_NEW_QUESTION });

// NEW QUESTION RESPONSE DATA
// {
//     "category": "Other",
//     "question": "When was the company founded?",
//     "isPreset": false,
//     "userEmail": "noah@gmail.com",
//     "answerFormat": null,
//     "metadata": {
//         "lastModified": "2021-02-13T07:49:56.923Z",
//         "createdDate": "2021-02-13T07:49:56.923Z"
//     },
//     "_id": "602784a4be7e49a8f2b65130"
// }

/**
 * Send new question to server,
 * cache if accepted.
 *
 * @param {*} category
 * @param {*} question
 * @param {*} answerType
 * @param {Object} credentials
 */
export const newQuestion = (
  category,
  question,
  answerType,
  { email, token },
  optionalCallback = () => {}
) => async (dispatch) => {
  try {
    dispatch(setIsLoadingNewQuestion()); // set loading status on

    // makes a post request to server with new question payload data
    const response = await axios({
      method: 'POST',
      url: `${SERVER_URL}/users/${email}/questions?_token=${token}`,
      data: {
        category,
        question,
        answerType
      }
    });

    // isolates _id prop from response
    const { _id } = response.data;

    // if request is successful, this dispatch will be allowed to execute
    dispatch(setOneQuestion(_id, response.data, category));

    // if we've made it this far, the operation is deemed successful, so we can trigger our optional callback function
    // if one was not defined, then the execution will be benign
    optionalCallback();
  } catch (err) {
    dispatch(setNewQuestionError(err.message)); // set error message into state if thrown
  } finally {
    dispatch(clearNewQuestionError());
    dispatch(clearIsLoadingNewQuestion()); // clears loading status from state
  }
};

/**
 * Sets many questions into state
 * @param {Object} questionsObject
 */
export const setManyQuestions = (questionsObject) => ({
  type: types.SET_MANY_QUESTIONS,
  payload: {
    ...questionsObject
  }
});

export const loadAndCacheQuestions = ({ email, token }) => async (dispatch) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${SERVER_URL}/users/${email}/questions?_token=${token}`
    });

    const mappedQuestions = mapCategories(response.data); // maps response data into nested object where top level is categories

    dispatch(setManyQuestions(mappedQuestions)); // dispatch to state
  } catch (err) {
    console.log(err); // should we add a piece of redux state for bulk loading of questions?
  }
};
