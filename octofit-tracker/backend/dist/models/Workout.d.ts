import mongoose, { Document } from 'mongoose';
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
export declare const Workout: mongoose.Model<IWorkout, {}, {}, {}, Document<unknown, {}, IWorkout, {}, mongoose.DefaultSchemaOptions> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
//# sourceMappingURL=Workout.d.ts.map