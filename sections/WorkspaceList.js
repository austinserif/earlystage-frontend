import React from 'react';
import WorkspaceItem from '../components/WorkspaceItem';
import { Card } from 'semantic-ui-react';
import { connect } from 'react-redux';

/**
 * WorkspaceList takes an array of workspaceIds as an argument,
 * and maps each item into a component to initiate data loading.
 * @param {*} param0
 */
const WorkspaceList = ({ workspaceArray, workspaces }) => {
  // map the input prop `workspaceArray` into an array of JSX `WorkspaceItem` compaonents
  const components = workspaces.workspaces.map((item) => {
    const [k, v] = item;
    return (
      <WorkspaceItem
        key={k}
        workspaceName={v.entity.name}
      />
    );
  });

  if (!workspaceArray || !workspaceArray.length) {
    return <div>To add a workspace, select New Workspace</div>;
  }

  if (workspaces.isLoading) {
    return (<div>...loading</div>)
  }

  // render list of components if any exist
  return <Card.Group>{components}</Card.Group>;
};

export default connect((state) => state.user.workspaces)(WorkspaceList);
