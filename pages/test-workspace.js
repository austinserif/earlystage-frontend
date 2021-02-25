import Workspace from '../sections/Workspace';

const TestWorkspace = (props) => {
  return (
    <>
      <Workspace />
    </>
  );
};

export const getStaticProps = async (ctx) => {
  return {
    props: {}
  };
};

export default TestWorkspace;
