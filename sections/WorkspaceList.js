import React from 'react';
import { useSelector } from 'react-redux';
import WorkspaceItem from '../components/WorkspaceItem';
import { Loader } from 'semantic-ui-react';

const WorkspaceList = ({ workspaceArray }) => {
  const components = workspaceArray.map((item) => {
    const [k, v] = item;
    return (
      <WorkspaceItem
        key={k}
        companyName={v.entity.name}
        industry={v.entity === undefined ? '' : v.entity.domain}
        description={'This is a company!'}
        componentSum={v.components ? v.components.length : 0}
      />
    );
  });
  return <>{components}</>;
};

export default WorkspaceList;
