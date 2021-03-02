import React, { useState, useEffect } from 'react';
import { List } from 'semantic-ui-react';
import QuestionComponent from '../components/QuestionComponent';
import questionSearchFunction from '../utils/questionSearchFunction';
import { connect } from 'react-redux';

const categories = [
  { key: 'financials', text: 'Financials', value: 'financials' },
  { key: 'corporateGovernance', text: 'Corporate Governance', value: 'corporateGovernance' },
  { key: 'market', text: 'Market', value: 'market' },
  { key: 'management', text: 'Management', value: 'management' },
  { key: 'other', text: 'Other', value: 'other' }
];

/**
 * WorkspaceList takes an array of workspaceIds as an argument,
 * and maps each item into a component to initiate data loading.
 * @param {Object} props
 * @param {Object[]} props.workspaceArray
 */
const ComponentList = (props) => {
  return (
    <List verticalAlign="middle">
      {Object.values(props[props.workspaceId].fullComponentData).map((v) => {
        const targetQuestionObject = questionSearchFunction(v.questionId, props.questionsObject); // questions object HERE refers to the object containing all categories and questions
        return (
          <QuestionComponent
            key={v._id}
            _id={v._id}
            answer={v.answer}
            readiness={v.readiness}
            questionObject={targetQuestionObject}
            categories={categories}
            workspaceId={props.workspaceId}
          />
        );
      })}
    </List>
  );
};

export default connect((state) => state.user.workspaces.workspaces)(ComponentList);
