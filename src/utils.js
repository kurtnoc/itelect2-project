// GT5 - mock task data (replace with your actual GT3 array if it differs)
export const mockTasks = [
  { id: 1, title: "Finish GT4 assignment", dueDate: "2026-07-22", completed: false },
  { id: 2, title: "Review Express routing", dueDate: "2026-07-29", completed: false },
  { id: 3, title: "Push GT5 to GitHub", dueDate: "2026-08-05", completed: true },
];

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

// GT4 Part 2 - custom error class
export class TaskValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "TaskValidationError";
  }
}

// GT4 Part 2 - createTask, built on top of validateTask from GT3
export const createTask = (taskData) => {
  if (!validateTask(taskData)) {
    throw new TaskValidationError("Invalid task data");
  }
  return { id: Date.now(), completed: false, ...taskData };
};