import { connect } from 'react-redux';
import { Tab, List, Modal } from 'semantic-ui-react';
import QuestionItem from '../QuestionItem';
import parseCookies from '../../utils/parseCookies';

/**
 * @param {Array} array
 * @param {Object} categories
 */
const buildQuestionsList = (array, categories, workspaceId) => {
  const cookies = parseCookies('token', 'email');
  const { token, email } = cookies;
  const mappedToComponents = array.map((v) => (
    <QuestionItem
      key={v._id}
      credentials={{ token, email }}
      details={categories[v.category][v._id]}
      workspaceId={workspaceId}
    />
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

  const panes = categories.map((v) => {
    return {
      menuItem: v.text,
      render: function render() {
        return (
          <Tab.Pane>
            <Modal.Content scrolling style={{ height: '200px' }}>
              <List relaxed divided verticalAlign="middle">
                {buildQuestionsList(
                  Object.values(props.categories[v.key]),
                  props.categories,
                  props.workspaceId
                )}
              </List>
            </Modal.Content>
          </Tab.Pane>
        );
      }
    };
  });

  return (
    <Modal.Header>
      <Tab menu={{ pointing: true, secondary: true }} panes={panes} />
    </Modal.Header>
  );
};

export default connect((state) => state.user.questions)(QuestionSelection);
