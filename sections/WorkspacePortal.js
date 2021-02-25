import React, { useState } from 'react';
import { Button, Icon, Modal, Grid, Segment, Label, GridRow } from 'semantic-ui-react';

const WorkspacePortal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const log = [];
  return (
    <Modal
      style={{ height: '90%' }}
      size="fullscreen"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>Scrolling Content Modal</Button>}>
      <Modal.Header>{props.workspaceName}</Modal.Header>
      <Modal.Content scrolling>
        <Grid columns={2}>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <Grid.Row>
              {log.length > 0 && <Segment attached="top" secondary></Segment>}
              <Segment attached={log.length > 0 ? 'bottom' : undefined} secondary>
                <Label>Entries: {log.length}</Label>
                <Button compact floated="right" onClick={() => {}} size="tiny">
                  Clear
                </Button>
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          Proceed <Icon name="chevron right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default WorkspacePortal;
