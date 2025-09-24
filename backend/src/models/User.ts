import mongoose, { Schema, Document } from "mongoose";
export interface IUser extends Document {
  name?: string;
  username?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, trim: true, minLength: 3, maxLength: 50 },
    username: { type: String, trim: true, required: false },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [12, "Password must be max 12 characters long"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
