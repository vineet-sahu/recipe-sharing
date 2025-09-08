import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  recipe: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema<IComment> = new Schema(
  {
    recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IComment>("Comment", CommentSchema);
