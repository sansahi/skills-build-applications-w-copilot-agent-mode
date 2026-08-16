import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  duration: number;
  distance?: number;
  calories?: number;
  intensity: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: Number,
    calories: Number,
    intensity: { type: String, default: 'moderate' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
