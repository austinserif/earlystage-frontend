import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { newQuestion } from '../../redux/user/questions/questionsActionCreators';

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

  const handleChangeInput = (e) => setQuestion(() => e.target.value);

  const handleChangeSelect = (e, data) => {
    console.log(data);
    setCategory(() => data.value);
  };

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
