import { Router } from 'express';
import { Team } from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find({}).populate('members').populate('captain').lean();
  res.json({ message: 'Teams route', teams });
});

router.post('/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json({ message: 'Team created', team });
});

export default router;
