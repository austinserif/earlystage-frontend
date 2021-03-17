import { List, Button } from 'semantic-ui-react';
import useNewComponent from '../../hooks/useNewComponent';

const QuestionItem = ({ details, credentials, workspaceId }) => {
  const payload = {
    questionId: details._id,
    workspaceId: workspaceId
  };

  const [isLoading, handleClick] = useNewComponent(credentials, payload);
  return (
    <List.Item>
      <>
        <List.Content floated="right">
          <Button loading={isLoading} onClick={handleClick} color="yellow">
            Add
          </Button>
        </List.Content>
        <List.Content>
          <List.Header>{details.question}</List.Header>
        </List.Content>
      </>
    </List.Item>
  );
};

export default QuestionItem;
