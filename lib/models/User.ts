import mongoose, { Schema, Document, Model, model, models } from 'mongoose';

interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    fullName?: string;
    bio?: string;
    location?: string;
    skills: mongoose.Types.ObjectId[]; // References to Skill documents
    projects: mongoose.Types.ObjectId[]; // References to Project documents
    gitContributions: number;
    hoursWorked: number;
    eventsAttended: mongoose.Types.ObjectId[]; // References to Event documents
    leaderboardRank: number;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullName: { type: String },
        bio: { type: String },
        location: { type: String },
        skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
        projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
        gitContributions: { type: Number, default: 0 },
        hoursWorked: { type: Number, default: 0 },
        eventsAttended: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
        leaderboardRank: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const User: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export type { IUser };
export default User;
