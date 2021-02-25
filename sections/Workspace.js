import React from 'react';
import { Container, Grid, GridColumn, Segment } from 'semantic-ui-react';
import DashboardNavbar from './DashboardNavbar';

const Workspace = (props) => {
  return (
    <>
      <Container>
        <DashboardNavbar />
      </Container>
      <Container>
        <Grid columns={2}>
          <GridColumn>
            <Segment style={{ height: '100%' }}></Segment>
          </GridColumn>
          <GridColumn>
            <Segment tertiary style={{ height: '100%' }}></Segment>
          </GridColumn>
        </Grid>
      </Container>
    </>
  );
};

export default Workspace;
