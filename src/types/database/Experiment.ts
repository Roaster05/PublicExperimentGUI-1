import mongoose from "mongoose";
import { iterationSchema } from "./Iteration";

const experimentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
  ],
  lastModified: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  iterations: {
    type: [iterationSchema],
  },
});

export const Experiment =
  mongoose.models.Experiment || mongoose.model("Experiment", experimentSchema);
