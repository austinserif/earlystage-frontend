import { List, Button, Loader } from 'semantic-ui-react';
import useNewComponent from '../../hooks/useNewComponent';

const QuestionItem = ({ details, credentials, workspaceId }) => {
  const payload = {
    questionId: details._id,
    workspaceId: workspaceId
  };

  console.log('Question Details', details, payload);

  const [isLoading, handleClick] = useNewComponent(credentials, payload);
  return (
    <List.Item>
      {isLoading ? (
        <Loader active />
      ) : (
        <>
          <List.Content floated="right">
            <Button onClick={handleClick} color="yellow">
              Add
            </Button>
          </List.Content>
          <List.Content>
            <List.Header>{details.question}</List.Header>
          </List.Content>
        </>
      )}
    </List.Item>
  );
};

export default QuestionItem;
