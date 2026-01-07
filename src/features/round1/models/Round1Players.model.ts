import mongoose, { Schema, Types } from "mongoose";

export interface IPlayer extends mongoose.Document {
  teamId: Types.ObjectId;
  score: number | null;
  timeTaken: number | null; // seconds
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const Round1PlayerSchema = new Schema(
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

const Round1Player =
  mongoose.models.Round1Player ||
  mongoose.model<IPlayer>("Round1Player", Round1PlayerSchema);

export default Round1Player;
