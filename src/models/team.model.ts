import mongoose from "mongoose";

export interface ITeam extends mongoose.Document {
  teamName: string;
  collegeName: string;
  players: {
    name: string;
    email: string;
    phone: string;
  }[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
});

const TeamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true, unique: true },
    collegeName: { type: String, required: true },
    players: {
      type: [playerSchema],
      required: true,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Team = mongoose.model<ITeam>("Team", TeamSchema);
export default Team;
