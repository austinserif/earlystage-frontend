/**
 * Ensures that `answerType` arg belongs to
 * to one of the approved strings.
 * @param {String} answerType
 */
export const checkAnswerType = (answerType) => {
  // object containing approved types
  const approvedTypes = {
    text: true,
    amount: true,
    list: true
  };

  return !!approvedTypes[answerType];
};
