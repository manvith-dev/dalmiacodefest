import mongoose, { Schema, Types } from "mongoose";

export interface IPlayer extends mongoose.Document {
  teamId: Types.ObjectId;
  score: number | null;
  timeTaken: number | null;
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const Round3PlayerSchema = new Schema(
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
  { timestamps: true },
);

const Round3Player =
  mongoose.models.Round3Player ||
  mongoose.model<IPlayer>("Round3Player", Round3PlayerSchema);

export default Round3Player;
