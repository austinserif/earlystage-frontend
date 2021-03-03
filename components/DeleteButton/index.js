import { Button, Segment, Loader, Icon } from 'semantic-ui-react';
import useDeleteButton from './useDeleteButton';

const DeleteButton = ({
  deleteRequest,
  deleteRequestArgs,
  actionCreator,
  actionCreatorArgs,
  resourceName,
  floated = false
}) => {
  const [selected, isLoading, { handleDelete, handleSelect, handleCancel }] = useDeleteButton(
    deleteRequest,
    deleteRequestArgs,
    actionCreator,
    actionCreatorArgs
  );

  if (isLoading) return <Loader active />;

  return (
    <>
      {selected ? (
        <>
          <Button floated={floated} onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            style={{ marginRight: '10px' }}
            floated={floated}
            color="red"
            onClick={handleDelete}>
            {`Delete ${resourceName}`}
          </Button>
        </>
      ) : (
        <Button icon="x" floated={floated} basic onClick={handleSelect} />
      )}
    </>
  );
};

export default DeleteButton;
