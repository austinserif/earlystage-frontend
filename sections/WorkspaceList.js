import React from 'react';
import WorkspaceItem from '../components/WorkspaceItem';
import { List } from 'semantic-ui-react';

/**
 * WorkspaceList takes an array of workspaceIds as an argument,
 * and maps each item into a component to initiate data loading.
 * @param {Object} props
 * @param {Object[]} props.workspaceArray
 */
const WorkspaceList = ({ workspaceArray }) => {
  return (
    <List verticalAlign="middle">
      {workspaceArray.map((v) => (
        <WorkspaceItem
          key={v._id}
          workspaceName={v.entity.name}
          workspaceComponentsCount={v.components.length}
          workspaceId={v._id}
        />
      ))}
    </List>
  );
};

export default React.memo(WorkspaceList);
