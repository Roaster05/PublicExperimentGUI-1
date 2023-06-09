import mongoose from "mongoose";

const iterationSchema = new mongoose.Schema({
  RunName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  timestamp: {
    startTime: {
      type: Date,
      default: Date.now,
    },
    stopTime: {
      type: Date,
    },
  },
  input: {
    configuration: {
      type: Map,
      of: mongoose.Schema.Types.ObjectId,
    },
    codeHash: {
      type: String,
    },
  },
  output: {
    dataHash: {
      type: String,
    },
    EnvironmentData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EnvironmentData",
    },
  },
});

export const Iteration = mongoose.models.Iteration || mongoose.model("Iteration", iterationSchema);
