import { Segment, Container, Grid, Header, List } from 'semantic-ui-react';

const Footer = () => (
  <Segment inverted vertical style={{ padding: '3em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Services" />
            <List link inverted>
              <List.Item as="a">Join Waitlist</List.Item>
              <List.Item as="a">Contact Us</List.Item>
              <List.Item as="a">FAQ</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4" inverted>
              © 2021 Sans Serif Labs
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;
