import mongoose, { Document } from 'mongoose';
export interface ITeam extends Document {
    name: string;
    description?: string;
    members: string[];
    leader: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Team: mongoose.Model<ITeam, {}, {}, {}, Document<unknown, {}, ITeam, {}, mongoose.DefaultSchemaOptions> & ITeam & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITeam>;
//# sourceMappingURL=Team.d.ts.map