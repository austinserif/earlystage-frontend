import React, { useState } from 'react';
import { List, Item, Card } from 'semantic-ui-react';
import veronika from '../../assets/img/veronika.jpg';
import Link from 'next/link';
import WorkspacePortal from '../../sections/WorkspacePortal';

const WorkspaceItem = ({ workspaceName, workspaceId, workspaceComponentsCount }) => {
  const [selected, setSelected] = useState(false);
  return (
    <Link href={`/workspace/${workspaceId}`}>
      <Card
        fluid
        id={workspaceId}
        style={{
          padding: '0.5em 0.5em 0.5em 0.5em',
          backgroundColor: selected ? '#EEEEEE' : 'transparent'
        }}
        onMouseEnter={() => setSelected(true)}
        onMouseLeave={() => setSelected(false)}>
        <Card.Content>
          <Card.Header>{workspaceName}</Card.Header>
          <Card.Meta>{workspaceComponentsCount} Components</Card.Meta>
        </Card.Content>
      </Card>
    </Link>
  );
};
export default React.memo(WorkspaceItem);
