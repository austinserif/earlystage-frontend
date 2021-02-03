import React from 'react';
import { useSelector } from 'react-redux';
import WorkspaceItem from '../components/WorkspaceItem';

const WorkspaceList = () => {
  const workspaces = useSelector((s) => s.user.workspaces);
  return (
    <div>
      {workspaces.map((v) => (
        <WorkspaceItem
          key={v._id}
          companyName={v.entity.name}
          industry={v.entity.domain}
          description={'This is a company!'}
          componentSum={v.components.length}
        />
      ))}
    </div>
  );
};

export default WorkspaceList;
