const generateSelectionOptions = (array) => {
  const cats = Object.keys(array);
  const options = cats.map((v) => {
    return {
        key: v.toLowerCase
    }
  })
};

export default generateSelectionOptions;