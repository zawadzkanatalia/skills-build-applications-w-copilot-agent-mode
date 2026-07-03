import { Router } from 'express';
import { LeaderboardEntry } from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).populate('user').sort({ rank: 1 }).lean();
  res.json({ message: 'Leaderboard route', leaderboard });
});

export default router;
