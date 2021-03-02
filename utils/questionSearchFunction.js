/**
 * Takes a question id and and questions object and
 * returns the corresponding question object
 *
 * NOTE: This is a temporary workaround
 */
export default function questionSearchFunction(qid, object) {
  const questionsByCategory = Object.values(object); // creates an array of objects
  const allQuestions = Object.assign({}, ...questionsByCategory);
  if (allQuestions[qid] === undefined) {
    return {};
  } else {
    return allQuestions[qid];
  }
}
