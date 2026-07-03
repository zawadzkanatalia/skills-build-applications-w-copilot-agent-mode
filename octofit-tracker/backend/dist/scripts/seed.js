"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.LeaderboardEntry.deleteMany({}),
            workout_1.Workout.deleteMany({}),
        ]);
        const users = await user_1.User.insertMany([
            {
                name: 'Maya Chen',
                email: 'maya.chen@example.com',
                age: 29,
                fitnessGoal: 'Marathon prep',
                city: 'Seattle',
            },
            {
                name: 'Jordan Alvarez',
                email: 'jordan.alvarez@example.com',
                age: 34,
                fitnessGoal: 'Strength gain',
                city: 'Austin',
            },
            {
                name: 'Sofia Patel',
                email: 'sofia.patel@example.com',
                age: 27,
                fitnessGoal: 'Mobility and endurance',
                city: 'Denver',
            },
        ]);
        await team_1.Team.create({
            name: 'Northstar Cyclists',
            sport: 'Cycling',
            captain: users[0]._id,
            members: users.map((user) => user._id),
        });
        await activity_1.Activity.insertMany([
            {
                user: users[0]._id,
                type: 'Run',
                durationMinutes: 45,
                caloriesBurned: 520,
                distanceKm: 7.2,
                notes: 'Morning tempo run',
            },
            {
                user: users[1]._id,
                type: 'Strength',
                durationMinutes: 60,
                caloriesBurned: 410,
                distanceKm: 0,
                notes: 'Upper body focus',
            },
            {
                user: users[2]._id,
                type: 'Yoga',
                durationMinutes: 35,
                caloriesBurned: 180,
                distanceKm: 0,
                notes: 'Recovery session',
            },
        ]);
        await leaderboard_1.LeaderboardEntry.insertMany([
            { user: users[0]._id, score: 980, streak: 5, rank: 1 },
            { user: users[1]._id, score: 910, streak: 3, rank: 2 },
            { user: users[2]._id, score: 890, streak: 4, rank: 3 },
        ]);
        await workout_1.Workout.insertMany([
            {
                title: 'HIIT Intervals',
                category: 'Cardio',
                difficulty: 'Intermediate',
                durationMinutes: 30,
                focus: ['endurance', 'speed'],
                description: 'Short bursts of fast effort for conditioning.',
            },
            {
                title: 'Core Stability Flow',
                category: 'Mobility',
                difficulty: 'Beginner',
                durationMinutes: 25,
                focus: ['core', 'mobility'],
                description: 'A guided strength and mobility circuit.',
            },
        ]);
        console.log('Seeded database with users, teams, activities, leaderboard entries, and workouts');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
