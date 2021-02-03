import React from 'react';
import { Header, Button, Segment, Icon, Divider } from 'semantic-ui-react';

/**
 * Renders a Header above a dividing line to seperate
 * it from the content below. As props it takes a
 * `title` string, which it displays as an h3.
 * @param {Object} props
 * @param {String} props.title title of the section to be displayed
 */
const DashboardHeader = ({ title }) => (
  <Segment clearing>
    <Header floated="right">
      <Button animated color="green">
        <Button.Content visible>New Workspace</Button.Content>
        <Button.Content hidden>
          <Icon name="add" />
        </Button.Content>
      </Button>
    </Header>
    <Header as="h2" floated="left">
      {title}
    </Header>
    <Divider clearing />
  </Segment>
);

export default DashboardHeader;
