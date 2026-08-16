import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: string;
  username: string;
  teamId?: string;
  totalPoints: number;
  totalActivities: number;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    teamId: String,
    totalPoints: { type: Number, default: 0 },
    totalActivities: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
