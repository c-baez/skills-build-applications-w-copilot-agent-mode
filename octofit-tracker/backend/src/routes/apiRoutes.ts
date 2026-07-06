import { Request, Response, Router } from 'express';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';

const router = Router();

router.get(['/users', '/users/'], async (_req: Request, res: Response) => {
  const users = await User.find().lean();
  res.json({ resource: 'users', count: users.length, items: users });
});

router.post(['/users', '/users/'], async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json({ resource: 'users', item: user });
});

router.get(['/teams', '/teams/'], async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members').populate('captain').lean();
  res.json({ resource: 'teams', count: teams.length, items: teams });
});

router.post(['/teams', '/teams/'], async (req: Request, res: Response) => {
  const team = await Team.create(req.body);
  res.status(201).json({ resource: 'teams', item: team });
});

router.get(['/activities', '/activities/'], async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user').lean();
  res.json({ resource: 'activities', count: activities.length, items: activities });
});

router.post(['/activities', '/activities/'], async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ resource: 'activities', item: activity });
});

router.get(['/leaderboard', '/leaderboard/'], async (_req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find().populate('user').lean();
  res.json({ resource: 'leaderboard', count: leaderboard.length, items: leaderboard });
});

router.post(['/leaderboard', '/leaderboard/'], async (req: Request, res: Response) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json({ resource: 'leaderboard', item: entry });
});

router.get(['/workouts', '/workouts/'], async (_req: Request, res: Response) => {
  const workouts = await Workout.find().lean();
  res.json({ resource: 'workouts', count: workouts.length, items: workouts });
});

router.post(['/workouts', '/workouts/'], async (req: Request, res: Response) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ resource: 'workouts', item: workout });
});

export default router;
