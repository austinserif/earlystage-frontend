import React from 'react';
import { Card, Icon, Button, Loader, Placeholder } from 'semantic-ui-react';
import useSWR from 'swr';
import cookieCutter from 'cookie-cutter';
import { connect, useSelector } from 'react-redux';

const WorkspaceItem = ({ workspaceId }) => {
  const workspace = useSelector((s) => s.user.workspaces.workspaces[workspaceId]);

  if (!workspace || workspace.isLoading) {
    return (
      <Card>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
      </Card>
    );
  }

  return (
    <Card
      header={workspace.entity.name}
      meta={workspace.entity.domain}
      extra={
        <>
          <a>
            <Icon name="tasks" />
            {workspace.components.length} Components
          </a>
          <Button floated="right" color="blue">
            Edit
          </Button>
        </>
      }
    />
  );
};

export default connect((state) => state.user.workspaces.workspaces)(WorkspaceItem);
