const initialState = {
  categories: {
    financials: {},
    corporateGovernance: {},
    management: {},
    market: {}
  }
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default questionsReducer;
