import mongoose, { Document } from 'mongoose';
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
export declare const Activity: mongoose.Model<IActivity, {}, {}, {}, Document<unknown, {}, IActivity, {}, mongoose.DefaultSchemaOptions> & IActivity & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
//# sourceMappingURL=Activity.d.ts.map