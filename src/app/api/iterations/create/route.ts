import { Experiment } from "@/types/database/Experiment";
import dbConnect from "@/helper/dbConnect";
import { z } from "zod";
import fs from "fs";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { experimentTitle, iterationTitle, description } = z
    .object({
      experimentTitle: z.string(),
      iterationTitle: z.string(),
      description: z.string().nullish()
    })
    .parse(body);

  await dbConnect();

  // Check if there is an experiment with the same name
  const existingExperiment = await Experiment.findOne({ title: experimentTitle });
  if (!existingExperiment) {
    console.log("Threre is no experiment with this name");
    return new Response(
      JSON.stringify({
        message: "Threre is no experiment with this name",
      }),
      {
        status: 400,
      }
    );
  }

  // Check if an iteration with the same name already exists in this experiment
  const existingIteration = existingExperiment.iterations.find(
    (iteration: any) => iteration.name === iterationTitle
  );

  if (existingIteration) {
    console.log("Iteration with the same name already exists");
    return new Response(
      JSON.stringify({
        message: "Iteration with the same name already exists",
      }),
      {
        status: 409,
      }
    );
  }

  // create folder for iteration
  fs.mkdir(
    `${process.env.Local_Path}/${experimentTitle}/${iterationTitle}`,
    { recursive: true },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  try {
    const newIteration = {
      name: iterationTitle,
      description: description,
      timestamp: {
        startTime: "",
        stopTime: "",
      },
      input: {
      },
      output: {
      },
    };
    existingExperiment.iterations.push(newIteration);
    await existingExperiment.save();
    return new Response(
      JSON.stringify({
        message: "Iteration created",
        iteration: newIteration,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error creating iteration",
      }),
      {
        status: 500,
      }
    );
  }
}
