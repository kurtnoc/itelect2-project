import express from 'express';
import db from '../models/index.cjs';

const { Task, User } = db;
const router = express.Router();

// GET 
router.get('/tasks', async (req, res) => {
  const tasks = await Task.findAll({ include: User, order: [['id', 'ASC']] });
  res.json(tasks);
});

// GET 
router.get('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id, { include: User });
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }
  res.json(task);
});

// POST 
router.post('/tasks', async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// PUT 
router.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }
  await task.update(req.body);
  res.json(task);
});

// DELETE
router.delete('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }
  await task.destroy();
  res.status(200).json({ message: 'Task deleted', task });
});

// GET 
router.get('/users', async (req, res) => {
  const users = await User.findAll({ include: Task, order: [['id', 'ASC']] });
  res.json(users);
});

export default router;