import mongoose, { Document } from 'mongoose';
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
export declare const Leaderboard: mongoose.Model<ILeaderboard, {}, {}, {}, Document<unknown, {}, ILeaderboard, {}, mongoose.DefaultSchemaOptions> & ILeaderboard & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboard>;
//# sourceMappingURL=Leaderboard.d.ts.map