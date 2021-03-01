import React, { useEffect, useState } from 'react';
import { Container, Menu, Loader, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import useComponents from '../../../hooks/useComponent';
import WorkspaceHeader from '../../../components/WorkspaceHeading';
import { useRouter } from 'next/dist/client/router';
import parseCookies from '../../../utils/parseCookies';
import EmailVerification from '../../../sections/EmailVerification';
import ComponentList from '../../../sections/ComponentList';
import NewComponentModal from '../../../sections/NewComponentModal';
import NewQuestionModal from '../../../sections/NewQuestionModal';

const Workspace = (props) => {
  console.log(props);
  console.log(props.questions);
  const categories = Object.keys(props.questions.categories);
  const cookies = parseCookies('token', 'email', 'isVerified');
  const router = useRouter();
  useEffect(() => {
    const { token, email, isVerified } = cookies;
    if (!token || !email || !isVerified) {
      router.push('/');
    }
  }, []);

  const [newComponentModalOpen, setNewComponentModalOpen] = useState(false);
  const [newQuestionModalOpen, setNewQuestionModalOpen] = useState(false);

  const { components, isLoading, isError } = useComponents(
    cookies.email,
    cookies.token,
    router.query.workspaceId
  );

  return (
    <>
      <Menu>
        <Menu.Item
          onClick={() => {
            router.back();
          }}
          icon="arrow left"></Menu.Item>
        <Menu.Item>
          <Menu.Header as="h3">
            {props.workspaces.workspaces[router.query.workspaceId].entity.name}
          </Menu.Header>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <NewComponentModal open={newComponentModalOpen} setOpen={setNewComponentModalOpen} />
          </Menu.Item>
          <Menu.Item>
            <NewQuestionModal open={newQuestionModalOpen} setOpen={setNewQuestionModalOpen} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Container text style={{ paddingTop: '7em' }}>
        {cookies.isVerified ? (
          isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <>
              {/* Dashboard Header contains title text and a button for creating new workspaces */}
              <Header as="h1" color="grey">
                Workspace
              </Header>

              {/* If the user had any workspaces, they will be displayed here */}
              <ComponentList
                questionsObject={props.questions.categories}
                componentArray={
                  Object.values(
                    props.workspaces.workspaces[router.query.workspaceId].fullComponentData
                  ) || []
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

// export const getServerSideProps = async (ctx) => {
//   try {
//     const { workspaceId } = ctx.params; // destructures workspaceId from url params object
//     const { cookies } = ctx.req; // destructures cookies object from the req object

//     // requests components from the server
//     const response = await axios({
//       method: 'GET',
//       url: `${SERVER_URL}/users/${cookies.email}/workspaces/${workspaceId}/components?_token=${cookies.token}`
//     });

//     const mappedData = mapData(response.data);

//     return {
//       props: {
//         mappedData,
//         workspaceId,
//         cookies
//       }
//     };
//   } catch (err) {
//     console.error(err);
//     ctx.res.writeHead(302, { Location: '/' });
//     ctx.res.end();
//     return {
//       props: {
//         mappedData: 'there was an error'
//       }
//     };
//   }
// };

export default connect((state) => state.user)(Workspace);
