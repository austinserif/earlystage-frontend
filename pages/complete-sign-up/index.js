import React from 'react';
import CompleteSignUp from '../../sections/CompleteSignUp';
import { useRouter } from 'next/dist/client/router';
import { SERVER_URL } from '../../config';
import axios from 'axios';

// const StyledContainer = styled.div`
//   margin: 20px;
// `;

const CompleteSignUpPage = ({ notFound, code }) => {
  const router = useRouter();
  if (notFound) router.push('/');

  return (
    <>
      <div style={{ margin: '20px' }}>
        <CompleteSignUp code={code} />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // get code param from query strings
    const { code } = context.query;

    // returns a prop object containing `notFound: true` so the page knows to redirect
    if (code === undefined) return { props: { notFound: true } };

    // check that the code is valid
    await axios({
      method: 'GET',
      baseURL: SERVER_URL,
      url: `/register/check-user?code=${code}`
    });

    return {
      props: {
        code,
        notFound: false
      }
    };
  } catch (err) {
    return { props: { notFound: true } };
  }
}

export default CompleteSignUpPage;
