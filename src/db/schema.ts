import { Schema, type Document } from "mongoose";

interface User extends Document {
  user: string;
  bio?: string;
}

export const UserSchema = new Schema<User>({
  user: {
    type: String,
    required: true,
    unique: true
  },
  bio: String
});