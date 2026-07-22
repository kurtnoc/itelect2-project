
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

export class TaskValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "TaskValidationError";
  }
}

export const createTask = (taskData) => {
  if (!validateTask(taskData)) {
    throw new TaskValidationError("Invalid task data");
  }
  return { id: Date.now(), completed: false, ...taskData };
};