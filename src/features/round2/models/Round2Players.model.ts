import mongoose, { Schema, Types } from "mongoose";

export interface IPlayer extends mongoose.Document {
  teamId: Types.ObjectId;
  score: number | null;
  timeTaken: number | null; // seconds
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const Round2PlayerSchema = new Schema(
  {
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
      unique: true,
    },
    timeTaken: { type: Number, default: null },
    score: { type: Number, default: null },
    startTime: { type: Date },
  },
  { timestamps: true }
);

const Round2Player =
  mongoose.models.Round2Player ||
  mongoose.model<IPlayer>("Round2Player", Round2PlayerSchema);

export default Round2Player;
