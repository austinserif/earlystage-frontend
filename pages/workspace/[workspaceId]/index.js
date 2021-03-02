import React, { useEffect, useState } from 'react';
import { Container, Menu, Loader, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import parseCookies from '../../../utils/parseCookies';
import EmailVerification from '../../../sections/EmailVerification';
import ComponentList from '../../../sections/ComponentList';
import NewComponentModal from '../../../sections/NewComponentModal';
import NewQuestionModal from '../../../sections/NewQuestionModal';

const Workspace = (props) => {
  const cookies = parseCookies('token', 'email', 'isVerified');
  const router = useRouter();
  const { workspaceId } = router.query;

  useEffect(() => {
    const { token, email, isVerified } = cookies;
    if (!token || !email || !isVerified) {
      router.push('/');
    }
  }, []);

  const isLoading = false;

  const [newComponentModalOpen, setNewComponentModalOpen] = useState(false);
  const [newQuestionModalOpen, setNewQuestionModalOpen] = useState(false);

  return (
    <>
      <Container>
        <Menu fixed="top">
          <Menu.Item
            onClick={() => {
              router.back();
            }}
            icon="arrow left"></Menu.Item>
          <Menu.Item>
            <Header as="h3" color="grey">
              Workspace
            </Header>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header as="h3">
              {props.workspaces.workspaces[router.query.workspaceId].entity.name}
            </Menu.Header>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item>
              <NewComponentModal
                open={newComponentModalOpen}
                setOpen={setNewComponentModalOpen}
                workspaceId={router.query.workspaceId}
              />
            </Menu.Item>
            <Menu.Item>
              <NewQuestionModal open={newQuestionModalOpen} setOpen={setNewQuestionModalOpen} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>

      <Container text style={{ paddingTop: '7em' }}>
        {cookies.isVerified ? (
          isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <>
              {/* If the user had any workspaces, they will be displayed here */}
              <ComponentList
                workspaceId={workspaceId}
                questionsObject={props.questions.categories}
                componentArray={
                  Object.values(props.workspaces.workspaces[workspaceId].fullComponentData) || []
                }
              />
            </>
          )
        ) : (
          <EmailVerification />
        )}
      </Container>
    </>
  );
};

export default connect((state) => state.user)(Workspace);
