"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        // Clear existing collections
        await User_1.User.deleteMany({});
        await Team_1.Team.deleteMany({});
        await Activity_1.Activity.deleteMany({});
        await Leaderboard_1.Leaderboard.deleteMany({});
        await Workout_1.Workout.deleteMany({});
        console.log('Cleared existing data');
        // Create sample users
        const users = await User_1.User.insertMany([
            {
                username: 'alice',
                email: 'alice@octofit.com',
                password: 'hashed_password_1',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
                bio: 'Fitness enthusiast and gym lover',
            },
            {
                username: 'bob',
                email: 'bob@octofit.com',
                password: 'hashed_password_2',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
                bio: 'Marathon runner and fitness coach',
            },
            {
                username: 'charlie',
                email: 'charlie@octofit.com',
                password: 'hashed_password_3',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
                bio: 'Yoga instructor and wellness expert',
            },
            {
                username: 'diana',
                email: 'diana@octofit.com',
                password: 'hashed_password_4',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
                bio: 'CrossFit athlete and personal trainer',
            },
        ]);
        console.log(`Created ${users.length} users`);
        // Create sample teams
        const teams = await Team_1.Team.insertMany([
            {
                name: 'Fit Warriors',
                description: 'A team dedicated to fitness and health',
                members: [users[0]._id.toString(), users[1]._id.toString()],
                leader: users[0]._id.toString(),
            },
            {
                name: 'Wellness Warriors',
                description: 'Promoting holistic wellness',
                members: [users[2]._id.toString(), users[3]._id.toString()],
                leader: users[2]._id.toString(),
            },
        ]);
        console.log(`Created ${teams.length} teams`);
        // Create sample activities
        const activities = await Activity_1.Activity.insertMany([
            {
                userId: users[0]._id.toString(),
                type: 'Running',
                duration: 45,
                distance: 7.5,
                calories: 600,
                intensity: 'high',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[1]._id.toString(),
                type: 'Cycling',
                duration: 60,
                distance: 25,
                calories: 800,
                intensity: 'high',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[2]._id.toString(),
                type: 'Yoga',
                duration: 60,
                calories: 200,
                intensity: 'low',
                date: new Date(),
            },
            {
                userId: users[3]._id.toString(),
                type: 'CrossFit',
                duration: 90,
                calories: 900,
                intensity: 'high',
                date: new Date(),
            },
            {
                userId: users[0]._id.toString(),
                type: 'Gym',
                duration: 75,
                calories: 650,
                intensity: 'high',
                date: new Date(),
            },
        ]);
        console.log(`Created ${activities.length} activities`);
        // Create sample leaderboard entries
        const leaderboard = await Leaderboard_1.Leaderboard.insertMany([
            {
                userId: users[0]._id.toString(),
                username: users[0].username,
                teamId: teams[0]._id.toString(),
                totalPoints: 1250,
                totalActivities: 5,
                rank: 1,
            },
            {
                userId: users[1]._id.toString(),
                username: users[1].username,
                teamId: teams[0]._id.toString(),
                totalPoints: 1100,
                totalActivities: 4,
                rank: 2,
            },
            {
                userId: users[2]._id.toString(),
                username: users[2].username,
                teamId: teams[1]._id.toString(),
                totalPoints: 950,
                totalActivities: 3,
                rank: 3,
            },
            {
                userId: users[3]._id.toString(),
                username: users[3].username,
                teamId: teams[1]._id.toString(),
                totalPoints: 1400,
                totalActivities: 6,
                rank: 4,
            },
        ]);
        console.log(`Created ${leaderboard.length} leaderboard entries`);
        // Create sample workouts
        const workouts = await Workout_1.Workout.insertMany([
            {
                userId: users[0]._id.toString(),
                name: 'Full Body Strength',
                description: 'Complete full body workout focusing on strength training',
                exercises: [
                    { name: 'Squat', sets: 4, reps: 8, weight: 225 },
                    { name: 'Bench Press', sets: 4, reps: 8, weight: 185 },
                    { name: 'Deadlift', sets: 3, reps: 5, weight: 315 },
                    { name: 'Pull-ups', sets: 3, reps: 10 },
                ],
                duration: 90,
                difficulty: 'advanced',
            },
            {
                userId: users[1]._id.toString(),
                name: 'HIIT Cardio Blast',
                description: 'High intensity interval training for cardiovascular fitness',
                exercises: [
                    { name: 'Burpees', sets: 3, reps: 15 },
                    { name: 'Mountain Climbers', sets: 3, reps: 20 },
                    { name: 'Jump Squats', sets: 3, reps: 15 },
                    { name: 'High Knees', sets: 3, reps: 30 },
                ],
                duration: 45,
                difficulty: 'advanced',
            },
            {
                userId: users[2]._id.toString(),
                name: 'Relaxing Yoga Session',
                description: 'Gentle yoga for flexibility and relaxation',
                exercises: [
                    { name: 'Downward Dog', sets: 1, reps: 1 },
                    { name: 'Child Pose', sets: 1, reps: 1 },
                    { name: 'Warrior I', sets: 1, reps: 1 },
                    { name: 'Corpse Pose', sets: 1, reps: 1 },
                ],
                duration: 60,
                difficulty: 'beginner',
            },
            {
                userId: users[3]._id.toString(),
                name: 'CrossFit WOD',
                description: 'Workout of the Day combining strength and cardio',
                exercises: [
                    { name: 'Thrusters', sets: 5, reps: 5, weight: 135 },
                    { name: 'Power Cleans', sets: 5, reps: 5, weight: 185 },
                    { name: 'Box Jumps', sets: 5, reps: 3, weight: 30 },
                    { name: 'Double Unders', sets: 5, reps: 30 },
                ],
                duration: 60,
                difficulty: 'advanced',
            },
        ]);
        console.log(`Created ${workouts.length} workouts`);
        console.log('\n✓ Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map