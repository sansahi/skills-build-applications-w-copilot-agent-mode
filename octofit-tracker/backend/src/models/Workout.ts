import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: string;
  name: string;
  description?: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }>;
  duration: number;
  difficulty: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        weight: Number,
      },
    ],
    duration: { type: Number, required: true },
    difficulty: { type: String, default: 'intermediate' },
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
