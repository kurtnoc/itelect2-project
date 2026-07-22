 // app.js - Main application entry point
 console.log('Server Starting...');

 import { formatDate, validateTask, mergeTaskUpdate } from './utils.js';

console.log("---Utility Functions Test---");

// 1. Test formatDate
const dateSample = formatDate(new Date("2026-07-22"));
console.log("formatDate:    ", dateSample); 


// 2. Test validateTask
const validationSample = validateTask();
console.log("validateTask:  ", validationSample); 


// 3. Test mergeTaskUpdate
const mergeSample = mergeTaskUpdate({ title: "Old" }, { title: "New" });
console.log("mergeTaskUpdate:", mergeSample); 

async function main() {
  console.log("---GT4 Async Functions Test---");
 
  try {
    const users = await fetchSampleUsers();
    console.log("fetchSampleUsers:", users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
  }
 
  try {
    const newTask = createTask({ title: "Finish GT4", dueDate: new Date("2026-07-29") });
    console.log("createTask:      ", newTask);
  } catch (err) {
    console.error("Error creating task:", err.message);
  }
 
  // Trigger the error path on purpose so TaskValidationError is exercised
  try {
    createTask({ title: "Missing due date" });
  } catch (err) {
    console.error(`Error creating task (${err.name}):`, err.message);
  }
}
 
