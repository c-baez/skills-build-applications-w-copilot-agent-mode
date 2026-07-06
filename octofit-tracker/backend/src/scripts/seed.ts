import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        role: 'captain',
        fitnessGoal: 'Marathon prep',
        streak: 12,
      },
      {
        name: 'Darius Brooks',
        email: 'darius.brooks@example.com',
        role: 'member',
        fitnessGoal: 'Strength building',
        streak: 8,
      },
      {
        name: 'Nia Patel',
        email: 'nia.patel@example.com',
        role: 'coach',
        fitnessGoal: 'Mobility and recovery',
        streak: 15,
      },
    ]);

    await Team.insertMany([
      {
        name: 'Velocity Squad',
        sport: 'Running',
        members: [users[0]._id, users[1]._id],
        captain: users[0]._id,
      },
      {
        name: 'Core Crushers',
        sport: 'Cross-training',
        members: [users[2]._id],
        captain: users[2]._id,
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Run',
        durationMinutes: 45,
        caloriesBurned: 520,
      },
      {
        user: users[1]._id,
        type: 'Strength',
        durationMinutes: 60,
        caloriesBurned: 410,
      },
      {
        user: users[2]._id,
        type: 'Yoga',
        durationMinutes: 35,
        caloriesBurned: 180,
      },
    ]);

    await Leaderboard.insertMany([
      {
        user: users[0]._id,
        score: 980,
        rank: 1,
      },
      {
        user: users[1]._id,
        score: 845,
        rank: 2,
      },
      {
        user: users[2]._id,
        score: 920,
        rank: 3,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Interval Run',
        description: 'A high-energy interval session for endurance.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        targetArea: 'Cardio',
      },
      {
        title: 'Full Body Strength',
        description: 'A balanced strength circuit with dumbbells and bodyweight.',
        difficulty: 'beginner',
        durationMinutes: 45,
        targetArea: 'Full Body',
      },
      {
        title: 'Mobility Flow',
        description: 'Recovery-focused mobility work to improve flexibility.',
        difficulty: 'beginner',
        durationMinutes: 25,
        targetArea: 'Mobility',
      },
    ]);

    console.log('Seed data inserted successfully');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
