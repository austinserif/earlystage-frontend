import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { newQuestion } from '../redux/user/questions/questionsActionCreators';

/**
 * `useNewQuestion` manages the state values and mechanics of
 * both controlled input fields in a new question form. It takes
 * a credentials object and callback function as its parameters,
 * and returns an array of controlled values in addition to an object
 * containing various functions for operating on the controlled
 * values.
 *
 * @param {Object} credentials
 * @param {String} credentials.email
 * @param {String} credentials.token
 *
 * @param {*} handleModal
 */
const useNewQuestion = ({ email, token }, handleModal) => {
  const dispatch = useDispatch();

  // hard coded categories (for now)
  const categories = [
    { key: 'financials', text: 'Financials', value: 'financials' },
    { key: 'corporateGovernance', text: 'Corporate Governance', value: 'corporateGovernance' },
    { key: 'market', text: 'Market', value: 'market' },
    { key: 'management', text: 'Management', value: 'management' },
    { key: 'other', text: 'Other', value: 'other' }
  ];

  // state initializations
  const [question, setQuestion] = useState(''); // question input controlled value
  const [category, setCategory] = useState(''); // category controlled value
  // const [answer, setAnswer] = useState(''); // answer controlled value

  /**
   * Updates `question` value in state
   * @param {Object} e event object emmited by reacts `onChange` prop
   */
  const handleChangeInput = (e) => setQuestion(() => e.target.value);

  /**
   * Updates `category` value in state to reflect
   * most recent selection change
   *
   * @param {Object} e event object emmited by reacts `onChange` prop
   * @param {Object} data data object emitted by reacts `onChange` prop
   */
  const handleChangeSelect = (e, data) => {
    setCategory(() => data.value);
  };

  /**
   * Handles submission of current
   * `category` and `question` values.
   */
  const handleSubmit = () => {
    const answerType = null; // this is set to null until feature implemented

    // dispatch category, question, answerType, credentials, and an optional callback function
    dispatch(
      newQuestion(category, question, answerType, { email, token }, () => {
        handleReset(); // resets form fields to initial blank state
        handleModal(() => false); // closes modal
      })
    );
  };

  /**
   * Resets `question` and `category` values to
   * their initial blank state.
   */
  const handleReset = () => {
    setQuestion('');
    setCategory('');
  };

  return [
    question,
    category,
    categories,
    { handleChangeInput, handleChangeSelect, handleSubmit, handleReset }
  ];
};

export default useNewQuestion;
