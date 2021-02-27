import React from 'react';
import WorkspaceItem from '../components/WorkspaceItem';
import { List } from 'semantic-ui-react';
import QuestionComponent from '../components/QuestionComponent';
import questionSearchFunction from '../utils/questionSearchFunction';

/**
 * WorkspaceList takes an array of workspaceIds as an argument,
 * and maps each item into a component to initiate data loading.
 * @param {Object} props
 * @param {Object[]} props.workspaceArray
 */
const ComponentList = ({ componentArray, questionsObject }) => {
  console.log(componentArray);
  return (
    <List verticalAlign="middle">
      {componentArray.map((v) => {
        const targetQuestionObject = questionSearchFunction(v.questionId, questionsObject); // questions object HERE refers to the object containing all categories and questions
        console.log(v);
        console.log(targetQuestionObject);
        // console.log(targetQuestionObject);
        return (
          <QuestionComponent
            key={v._id}
            _id={v._id}
            answer={v.answer}
            question={v.question}
            // questionCategory={v.question.category}
          />
        );
      })}
    </List>
  );
};

export default React.memo(ComponentList);
