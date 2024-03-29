/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import veronika from '../assets/img/veronika.jpg';

import React from 'react';
import { Button, Container, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';

const HomepageLayout = () => (
  <Container>
    {/* <Segment style={{ padding: '0em' }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              &quot;I wish this was around when I was an analyst!&quot;
            </Header>
            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              <Image circular size="big" src={veronika} />
              &quot;I shouldn&apos;t have gone with their competitor.&quot;
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <b>Austin</b> Chief Fun Officer Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
        </p>
        <Button as="a" size="large">
          Read More
        </Button>

        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
          <a href="/">Case Studies</a>
        </Divider>

        <Header as="h3" style={{ fontSize: '2em' }}>
          Did We Tell You About Our Bananas?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
          it&apos;s really true. It took years of gene splicing and combinatory DNA research, but
          our bananas can really dance.
        </p>
        <Button as="a" size="large">
          I&apos;m Still Quite Interested
        </Button>
      </Container>
    </Segment> */}
  </Container>
);

export default HomepageLayout;
