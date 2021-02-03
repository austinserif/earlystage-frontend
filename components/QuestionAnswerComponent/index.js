import React, { useState } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';

const QuestionAnswerComponent = () => {
  const [editMode, setEditMode] = useState(true);
  return (
    <Container>
      <Form error={!err ? false : err}>
        <Form.Field
          id="-control-name"
          disabled={!editMode}
          control={Input}
          fluid
          label="Name"
          name="name"
          value={values.name}
          placeholder="Name"
          onChange={handleChange}
          error={err ? true : false}
        />
      </Form>
      <Button></Button>
    </Container>
  );
};

export default QuestionAnswerComponent;
