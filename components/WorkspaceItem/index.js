import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';

const WorkspaceItem = ({ companyName, industry, componentSum }) => (
  <Card
    header={companyName}
    meta={industry}
    extra={
      <>
        <a>
          <Icon name="tasks" />
          {`${componentSum}`} Components
        </a>
        <Button floated="right" color="blue">
          Edit
        </Button>
      </>
    }
  />
);
export default WorkspaceItem;
