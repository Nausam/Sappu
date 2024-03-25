import { Document, Schema, model, models } from "mongoose";

export interface ITournament extends Document {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl: string;
  prizePool: string;
  entryFee: string;
  hasStarted: boolean;
  startDate: Date;
  endDate: Date;
  category: { _id: string; name: string };
  creator: { _id: string; firstName: string; lastName: string };
}

const TournamnetSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  prizePool: { type: String },
  entryFee: { type: String },
  hasStarted: { type: Boolean, default: false },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Tournamnet = models.Tournamnet || model("Tournamnet", TournamnetSchema);

export default Tournamnet;
