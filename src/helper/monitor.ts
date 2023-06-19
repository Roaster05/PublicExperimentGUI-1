import osUtils from "os-utils";
import dbConnect from "./dbConnect";
import { Experiment } from "../types/database/Experiment";
import os from "os";

const experimentTitle = process.argv[2];
const iterationTitle = process.argv[3];
const interval = parseInt(process.argv[4]);

async function getIterationDatabase(experimentTitle: string, iterationTitle: string) {
  await dbConnect();
  const existingExperiment = await Experiment.findOne({ title: experimentTitle });
  const existingIteration = existingExperiment.iterations.find(
    (iteration: any) => iteration.name === iterationTitle
  );
  return { existingExperiment, existingIteration };
}

async function monitor() {
  let { existingIteration } = await getIterationDatabase(experimentTitle, iterationTitle);

  if (!existingIteration) {
    console.log("No iteration found");
    return;
  }

  const newEnvironmentData = [
    {
      command: "CPU usage",
      interval: interval,
      record: [],
    }, // ...
  ];

  existingIteration.output = { EnvironmentData: newEnvironmentData };
  existingIteration.timestamp.startTime = new Date();

  setInterval(async () => {
    const cpuUsage = await new Promise<number>((resolve, reject) => {
      osUtils.cpuUsage((usage: number) => resolve(usage));
    });

    existingIteration.output.EnvironmentData[0].record.push({
      timestamp: new Date(),
      val: cpuUsage,
    });
    existingIteration.timestamp.endTime = new Date();

    try {
      const updatedExperiment = await Experiment.findOneAndUpdate(
        { title: experimentTitle },
        {
          $set: {
            "iterations.$[elem].output": existingIteration.output,
            "iterations.$[elem].timestamp": existingIteration.timestamp,
          },
        },
        { arrayFilters: [{ "elem.name": iterationTitle }], new: true }
      );
      console.log(updatedExperiment.iterations[0].output.EnvironmentData[0].record);
    } catch (error) {
      console.error("Error saving experiment:", error);
    }
  }, interval * 1000);
}

monitor();
