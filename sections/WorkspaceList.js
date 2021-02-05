import React from 'react';
import WorkspaceItem from '../components/WorkspaceItem';
import { Card } from 'semantic-ui-react';

const WorkspaceList = ({ workspaceArray }) => {
  // map the input prop `workspaceArray` into an array of JSX `WorkspaceItem` compaonents
  const components = workspaceArray.map((item) => {
    const [k, v] = item;
    return (
      <WorkspaceItem
        key={k}
        companyName={v.entity.name}
        industry={v.entity === undefined ? '' : v.entity.domain}
        componentSum={v.components ? v.components.length : 0}
      />
    );
  });

  // render list of components if any exist
  return <Card.Group>{components}</Card.Group>;
};

export default WorkspaceList;
