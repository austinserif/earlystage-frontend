import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const WorkspaceItem = ({ companyName, industry, componentSum }) => (
  <Card
    header={companyName}
    meta={industry}
    extra={
      <a>
        <Icon name="tasks" />
        {`${componentSum}`} Components
      </a>
    }
  />
);
export default WorkspaceItem;
