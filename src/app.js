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

