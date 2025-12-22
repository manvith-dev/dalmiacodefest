import mongoose from "mongoose";

export interface ITeam extends mongoose.Document {
  registrationId: string;
  teamName: string;
  collegeName: string;
  players: {
    name: string;
    email: string;
    phone: string;
  }[];
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
    registrationId: { type: String, unique: true, index: true },
    teamName: { type: String, required: true, unique: true },
    collegeName: { type: String, required: true },
    players: {
      type: [playerSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Team = mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);

export default Team;
