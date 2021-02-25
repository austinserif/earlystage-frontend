import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Input, Header } from 'semantic-ui-react';
import useSWR from 'swr';
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * Shape of data returned from GET /users/:email/workspaces/:workspaceId/components/:componentId
 *
 * {
 *    "_id": "6025ea13be7e49b838b6512c",
 *    "questionId": "6025e96abe7e490126b6512b",
 *    "workspaceId": "60259ed8be7e494bc9b6512a",
 *    "answer": "A gagillion dollars",
 *    "readiness": "draft",
 *    "metadata": {
 *      "lastModified": "2021-02-12T02:38:11.603Z",
 *      "createdDate": "2021-02-12T02:38:11.603Z"
 *    }
 * }
 */
const QuestionAnswerComponent = (props) => {
  const [value, setValue] = useState(props.answer);
  return (
    <Container>
      <Header>{props.answer}</Header>
    </Container>
  );
};

export default QuestionAnswerComponent;
