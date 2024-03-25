import { Document, Schema, model, models } from "mongoose";

export interface ITeam extends Document {
  _id: string;
  name: string;
  moto: string;
  description?: string;
  imageUrl: string;
  creator: { _id: string; firstName: string; lastName: string };
  createdAt: Date;
}

const TeamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  moto: { type: String },
  imageUrl: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  players: [{ type: Schema.Types.ObjectId, ref: "User" }],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Team = models.Team || model("Team", TeamSchema);

export default Team;
