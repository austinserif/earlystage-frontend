import { connect } from 'react-redux';
import { Tab, Pane, List, Segment, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const DashContainer = styled.div`
  padding: 50px;
`;

const ScrollableContainer = styled.div`
  overflow-y: scroll;
`;

/**
 * @param {Array} array
 * @param {Object} categories
 */
const buildQuestionsList = (array, categories) => {
  const mappedToComponents = array.map((v) => (
    <List.Item key={v._id}>
      <List.Content floated="right">
        <Button
          onClick={() => {
            console.log(categories[v.category][v._id]);
          }}
          color="yellow">
          Add
        </Button>
      </List.Content>
      <List.Content>
        <List.Header>{v.question}</List.Header>
      </List.Content>
    </List.Item>
  ));
  return mappedToComponents;
};

/**
 * `QuestionSelection` renders a left-sidebar menu,
 * and a window containing questions. Each sidebar menu
 * item is a question category.
 *
 * @param {Object} props
 */
const QuestionSelection = (props) => {
  const categories = [
    { key: 'financials', text: 'Financials', value: 'financials' },
    { key: 'corporateGovernance', text: 'Corporate Governance', value: 'corporateGovernance' },
    { key: 'market', text: 'Market', value: 'market' },
    { key: 'management', text: 'Management', value: 'management' },
    { key: 'other', text: 'Other', value: 'other' }
  ];
  const panes = [
    {
      menuItem: 'Market',
      render: () => (
        <Tab.Pane>
          <ScrollableContainer>
            <List relaxed divided verticalAlign="middle">
              {buildQuestionsList(Object.values(props.categories.market), props.categories)}
            </List>            
          </ScrollableContainer>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Financials',
      render: () => (
        <Tab.Pane>
          <List relaxed divided verticalAlign="middle">
            {buildQuestionsList(Object.values(props.categories.financials), props.categories)}
          </List>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Corporate Governance',
      render: () => (
        <List relaxed celled verticalAlign="middle">
        {buildQuestionsList(Object.values(props.categories.corporateGovernance), props.categories)}
        </List>
      )
    },
    {
      menuItem: 'Management',
      render: () => (
        <Tab.Pane>
          <List relaxed celled verticalAlign="middle">
            {buildQuestionsList(Object.values(props.categories.management), props.categories)}
          </List>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Other',
      render: () => (
        <Tab.Pane>
          <List relaxed celled verticalAlign="middle">
            {buildQuestionsList(Object.values(props.categories.other), props.categories)}
          </List>
        </Tab.Pane>
      )
    }
  ];

  return (
    <DashContainer>
      <Tab menu={{ fluid: true, vertical: true }} menuPosition="left" panes={panes} />
    </DashContainer>
  );
};

export default connect((state) => state.user.questions)(QuestionSelection);
