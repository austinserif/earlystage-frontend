import React, { useState } from 'react';
import { List, Item } from 'semantic-ui-react';
import veronika from '../../assets/img/veronika.jpg';
import Link from 'next/link';
import WorkspacePortal from '../../sections/WorkspacePortal';

const WorkspaceItem = ({ workspaceName, workspaceId, workspaceComponentsCount }) => {
  const [selected, setSelected] = useState(false);
  return (
    <Link href={`/workspace/${workspaceId}`}>
      <List.Item
        id={workspaceId}
        style={{
          padding: '1em 1em 1em 1em',
          backgroundColor: selected ? '#EEEEEE' : 'transparent',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setSelected(true)}
        onMouseLeave={() => setSelected(false)}>
        <Item.Image src={veronika} />
        <Item.Content
          verticalAlign="top"
          header={workspaceName}
          meta={`${workspaceComponentsCount} Components`}
        />
        {/* <WorkspacePortal workspaceName={workspaceName} workspaceId={workspaceId} /> */}
      </List.Item>
    </Link>
  );
};
export default React.memo(WorkspaceItem);
