import { useState, useEffect } from 'react';
import { setWorkspaces } from '../redux/user/workspaces/workspacesActionCreators';
import { useDispatch } from 'react-redux';

const useLoadWorkspace = ({ allWorkspaceData }) => {
  // isLoading is automatically set to true on the first render
  const [isLoading, setIsLoading] = useState(true);

  // `percent` defines the current status of the progress bar
  const [percent, setPercent] = useState(0);

  // `dispatchComplete` is initially set to false, and triggers the initial
  // data load inside our useEffect block, and is subsequently turned off
  //to allow iteration of progress bar without causing the data to be
  // dispatched again.
  const [dispatchComplete, setDispatchComplete] = useState(false);

  const dispatch = useDispatch(); // instantiates the dispatch function

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
      console.log(data, typeof data);
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

  useEffect(() => {
    if (!dispatchComplete) {
      try {
        const mappedData = mapData(allWorkspaceData);
        dispatch(setWorkspaces(mappedData));
      } catch (err) {
        console.error(err);
        dispatch(setWorkspaces({})); // if error thrown dispatch empty object for now
      } finally {
        setDispatchComplete(true);
      }
    }
  }, []); // this will only execute once

  return [isLoading, percent];
};

export default useLoadWorkspace;
