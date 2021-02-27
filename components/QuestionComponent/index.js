import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Input } from 'semantic-ui-react';
import parseCookies from '../../utils/parseCookies';
import { useDispatch } from 'react-redux';
import { updateComponent } from '../../redux/user/workspaces/workspacesActionCreators';

/**
 *
 * @param {Object} props
 * @param {String} props.question question string
 * @param {Sring} props.questionCategory category string
 */
const QuestionComponent = ({ _id, question, questionCategory, workspaceId, answer, readiness }) => {
  const dispatch = useDispatch(); // exposes access to store updates

  // returns an object with one key/value pair for each argument that corresponds a valid cookie
  const cookies = parseCookies('email', 'token');

  // initially sets currentAnswer and readiness into state as whatever props passes in
  const [currentAnswer, setCurrentAnswer] = useState(answer);
  const [currentReadiness, setCurrentReadiness] = useState(readiness);

  // initially sets unsavedChanges into state as false, but this will change whenever props.answer !== currentAnswer
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // sets an error object into state that contains a boolean trigger as well as a message property
  const [error, setError] = useState({ hasError: false, errorMessage: '' });

  // sets local isLoading state
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles form updates to the currentAnswer state
   * @param {Object} e event object
   */
  const handleChange = (e) => setCurrentAnswer(() => e.target.value);

  /**
   * Handles submission of new component answer value to server if
   * `props.answer !== currentAnswer.
   */
  const handleSubmit = async () => {
    try {
      setIsLoading(() => true); // tells client that a request is being made, will stop loading once resolved

      // sends request to server with proposed changes, an error will be thrown if not accepted
      await axios({
        method: 'PATCH',
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
        url: `/users/${cookies.email}/workspaces/${workspaceId}/components/${_id}`,
        data: {
          updates: [
            { field: 'answer', value: currentAnswer },
            { field: 'readiness', value: currentReadiness }
          ]
        }
      });

      // if error is not thrown, assume that the changes were accepted

      // dispatch update to redux store
      dispatch(updateComponent(currentAnswer, currentReadiness, workspaceId, _id));
    } catch (err) {
      setError(() => ({ hasError: true, errorMessage: err.message }));
    } finally {
      setIsLoading(() => false);
    }
  };

  useEffect(() => {
    if (answer !== currentAnswer && !unsavedChanges) {
      setUnsavedChanges(() => true);
    } else if (answer === currentAnswer && unsavedChanges) {
      setUnsavedChanges(() => false);
    }
  }, [answer, currentAnswer]);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{question || 'Question Not Found'}</Card.Header>
        <Card.Meta>{questionCategory || 'No Category'}</Card.Meta>
        <Card.Description>
          <Form loading={isLoading}>
            <Form.Field
              control={Input}
              onChange={handleChange}
              value={currentAnswer}
              action={{
                onClick: handleSubmit,
                color: 'teal',
                labelPosition: 'right',
                icon: 'save',
                content: 'Save',
                disabled: !unsavedChanges
              }}
              actionPosition="right"
              placeholder="Search..."
              defaultValue="52.03"
              error={error.hasError}
            />
          </Form>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default React.memo(QuestionComponent);
