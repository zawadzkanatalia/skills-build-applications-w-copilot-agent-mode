import { Router } from 'express';
import { Workout } from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ message: 'Workouts route', workouts });
});

router.post('/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ message: 'Workout created', workout });
});

export default router;
