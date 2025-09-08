import mongoose, {Schema, Document, mongo} from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
}, 
{timestamps: true}
);


export default mongoose.model<IUser>("User", UserSchema);