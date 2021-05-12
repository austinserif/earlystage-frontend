import React, { useState, useEffect } from 'react';
import CompleteSignUp from '../../sections/CompleteSignUp';
import styled from 'styled-components';
import { useRouter } from 'next/dist/client/router';
import { Loader } from 'semantic-ui-react';
import { SERVER_URL } from '../../config';
import axios from 'axios';

const StyledContainer = styled.div`
  margin: 20px;
`;

const CompleteSignUpPage = () => {
  const router = useRouter();
  if (!router.query.code) router.push('/');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // throws error if no unverified user resource is found
        await axios({
          method: 'get',
          baseURL: SERVER_URL,
          url: `/register/check-user?code=${router.query.code}`
        });

        // turn off loading
        setIsLoading(() => false);
      } catch (err) {
        // redirect if anything goes wrong or user is unauthorized
        router.push('/');
      }
    };

    fetchUser();
  }, []);

  if (isLoading) return <Loader active content="Checking user status..." />;

  return (
    <>
      <StyledContainer>
        <CompleteSignUp />
      </StyledContainer>
    </>
  );
};

export default CompleteSignUpPage;
