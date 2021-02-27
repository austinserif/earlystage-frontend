/**
 * Takes a question id and and questions object and
 * returns the corresponding question object
 *
 * NOTE: This is a temporary workaround
 */
export default function questionSearchFunction(qid, object) {
  console.log(object);
  const questionsByCategory = Object.values(object); // creates an array of objects
  console.log(questionsByCategory);
  const allQuestions = Object.assign({}, ...questionsByCategory);
  console.log(allQuestions);
  console.log('------- finished ---------');
  return allQuestions[qid];
}
