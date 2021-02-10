// import { useState } from "react"

/**
 * `useIsLoading` is a hook that handles the loading status for a page
 * on which many request resolutions are dependent. It takes an array
 * of target objects, in addition to a fetch callback with which any
 * target object must be a compatible argument. For each target object
 * in the array, the item is passed into the callback function and
 * the response data or error is cataloged. Both the current results
 * object and the percent complete status are returned by the hook.
 * Optionally, `useIsLoading` takes a requery argument that defaults
 * to false, but when overriden enforces an attempted requery on all
 * failed requests.
 *
 * @param {Array} argsArray
 * @param {Function} callback
 */
// const useIsLoading = (argsArray, callback) => {
//     const [results, setResults] = useState([]);
//     const [errs, setErrs] = useState([]);
//     const [percent, setPercent] = useState([]);

//     return [results, errs, percent];
// }

// export default useIsLoading;
