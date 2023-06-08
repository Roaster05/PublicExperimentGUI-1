import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

export const Iteration = mongoose.models.modelName || mongoose.model("Iteration", memberSchema);
