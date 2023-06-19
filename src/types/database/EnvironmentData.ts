import mongoose from "mongoose";

const timeSeriesSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  val: {
    type: Number || String,
    required: true,
  },
});

// const TimeSeries = mongoose.model("TimeSeries", timeSeriesSchema);

export const environmentDataSchema = new mongoose.Schema({
  command: {
    type: String,
    required: true,
  },
  interval: {
    type: Number,
    required: true,
  },
  record: {
    type: [timeSeriesSchema],
  },
});

// export const EnvironmentData =
//   mongoose.models.EnvironmentData || mongoose.model("EnvironmentData", environmentDataSchema);
