import React from 'react';
import WorkspaceItem from '../components/WorkspaceItem';
import { List, Card } from 'semantic-ui-react';

/**
 * WorkspaceList takes an array of workspaceIds as an argument,
 * and maps each item into a component to initiate data loading.
 * @param {Object} props
 * @param {Object[]} props.workspaceArray
 */
const WorkspaceList = ({ workspaceArray, cookies }) => {
  return (
    <Card.Group>
      {workspaceArray.map((v) => (
        <WorkspaceItem
          email={cookies.email}
          token={cookies.token}
          key={v._id}
          workspaceName={v.entity.name}
          workspaceComponentsCount={v.components.length}
          workspaceId={v._id}
        />
      ))}
    </Card.Group>
  );
};

export default React.memo(WorkspaceList);
