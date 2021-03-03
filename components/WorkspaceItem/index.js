import React, { useState } from 'react';
import { List, Item, Card, Button, Segment, Icon } from 'semantic-ui-react';
import veronika from '../../assets/img/veronika.jpg';
import Link from 'next/link';
import WorkspacePortal from '../../sections/WorkspacePortal';
import DeleteButton from '../DeleteButton';
import { deleteWorkspaceAndClearReferences } from '../../redux/user/workspaces/workspacesActionCreators';
import { deleteRequest } from '../../api/workspace';

const WorkspaceItem = ({ workspaceName, workspaceId, workspaceComponentsCount, email, token }) => {
  return (
    <Card fluid id={workspaceId}>
      <Card.Content>
        <Card.Header>{workspaceName}</Card.Header>
        <Card.Meta>{workspaceComponentsCount} Components</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Link href={`/workspace/${workspaceId}`}>
          <Button floated="left">
            Enter
            <Icon name="arrow right" />
          </Button>
        </Link>
        <DeleteButton
          floated="right"
          deleteRequest={deleteRequest}
          deleteRequestArgs={[{ email: email, token: token }, workspaceId]}
          actionCreator={deleteWorkspaceAndClearReferences}
          actionCreatorArgs={[workspaceId]}
          resourceName="Workspace"
        />
      </Card.Content>
    </Card>
  );
};
export default React.memo(WorkspaceItem);
