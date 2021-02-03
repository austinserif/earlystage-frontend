import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const WorkspaceItem = ({ companyName, industry, description, componentSum }) => (
  <Card
    header={companyName}
    meta={industry}
    description={description || ''}
    extra={
      <a>
        <Icon name="tasks" />
        {componentSum} Items
      </a>
    }
  />
);
export default WorkspaceItem;
