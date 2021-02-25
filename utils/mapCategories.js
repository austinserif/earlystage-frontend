const mapCategories = (data) => {
  const categories = {}; // initialize

  data.forEach((v) => {
    const { category, _id } = v; // destructure

    // checks if categorey has been loaded yet
    if (!categories[category]) {
      categories[category] = { [_id]: v }; // set new category into the object
    } else {
      categories[category][_id] = v; // set data into already existing category field
    }
  });
  // return new object
  return categories;
};

export default mapCategories;
