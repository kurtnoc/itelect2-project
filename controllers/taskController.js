
import db from '../models/index.cjs';

const { Task, User } = db;

// GET /api/tasks
export async function listTasks(req, res) {
  const tasks = await Task.findAll({ include: User, order: [['id', 'ASC']] });
  res.json(tasks);
}

// GET /api/tasks/:id
export async function getTask(req, res) {
  const task = await Task.findByPk(req.params.id, { include: User });
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }
  res.json(task);
}

// POST /api/tasks
export async function createTask(req, res) {
  const task = await Task.create(req.body);
  res.status(201).json(task);
}

// PUT /api/tasks/:id
export async function updateTask(req, res) {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }
  await task.update(req.body);
  res.json(task);
}

// DELETE /api/tasks/:id
export async function deleteTask(req, res) {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }
  await task.destroy();
  res.status(200).json({ message: 'Task deleted', task, deletedBy: req.user.email });
}