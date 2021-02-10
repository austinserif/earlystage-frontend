import React from 'react';
import { List, Item } from 'semantic-ui-react';
import veronika from '../../assets/img/veronika.jpg';
import Link from 'next/link';

const WorkspaceItem = ({ workspaceName, workspaceId, workspaceComponentsCount }) => {
  return (
    <Link href={`/workspace/${workspaceId}`}>
      <List.Item id={workspaceId} style={{ padding: '1em 0 1em 0' }}>
        <Item.Image src={veronika} />
        <Item.Content
          verticalAlign="top"
          header={workspaceName}
          meta={`${workspaceComponentsCount} Components`}
        />
      </List.Item>
    </Link>
  );
};
export default React.memo(WorkspaceItem);
