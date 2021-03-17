/** `mapData` is a helper function for cleaning
 * arrays containing data. The function expects that
 * the `data` array will contain at least one property
 * called `_id`, in additon to other properties as well.
 * If the array is not empty then it will map the array
 * into an object of key-value pairs, where and _id prop
 * becomes the key, revealing the remaining data property
 * as its value.
 *
 * @param {Array} data
 */
const mapData = (data) => {
  try {
    // tests the input type
    if (!data) throw new Error('Input type must be Array');

    // checks checks for empty array
    if (!data.length) return {};

    const returnObject = new Object(); // creates a new empty object to hold mapped data

    // iterates through each item and adds it to the return object
    for (let i = 0; i < data.length; i++) {
      // checks for evidence of _id property in current array item
      if (!data[i]._id) {
        throw new Error(
          'All items in array argument `data` must be of type Object and contain an attribute `_id` to serve as a key value.'
        );
      }

      const currItem = data[i]; // current array item
      const key = currItem._id; // set the _id property as the new key
      const value = currItem; // set whole item as the value

      returnObject[key] = value; // add mapped item to return object
    }

    return returnObject;
  } catch (err) {
    // pass on any inherited errors
    throw new Error(err);
  }
};

export default mapData;
