
// export arrow function for format date:
export const formatDate = (date) => `Due: ${date.toLocaleDateString('en-US')}`;

//export arrow function with destructuring for validateTask
export const validateTask = ({ title, dueDate } = {}) => {
  return !!(title && dueDate);
};

//export arrow function for mergeTaskUpdate rest operator
export const mergeTaskUpdate = (original, ...updates) => {
  return updates.reduce((acc, curr) => ({ ...acc, ...curr }), { ...original });
};

