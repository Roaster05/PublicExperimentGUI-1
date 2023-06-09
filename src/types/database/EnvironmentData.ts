import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  command: {
    type: String,
    required: true,
  },
  interval: {
    type: Number,
    required: true,
  },
  metrics: {
    type: [String],
  },
});

const Config = mongoose.model("Config", configSchema);

const metricSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number || String,
  },
});
const Metric = mongoose.model("MetricSchema", metricSchema);

const timeSeriesSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  metrics: {
    type: [Metric.schema],
  },
});

const TimeSeries = mongoose.model("TimeSeries", timeSeriesSchema);

const environmentDataSchema = new mongoose.Schema({
  command: {
    type: String,
    required: true,
  },
  interval: {
    type: Number,
    required: true,
  },
  metrics: {
    type: [TimeSeries.schema],
  },
});

export const EnvironmentData =
  mongoose.models.EnvironmentData || mongoose.model("EnvironmentData", environmentDataSchema);
