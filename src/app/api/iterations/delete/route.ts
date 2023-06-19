import dbConnect from "@/helper/dbConnect";
import { Experiment } from "@/types/database/Experiment";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
    const body = await req.json();

    const { experimentid, iterationTitle} = z
      .object({
        experimentid: z.string(),
        iterationTitle: z.string(),
      })
      .parse(body);
  

  await dbConnect();
    const existingExperiment = await Experiment.findOne({ _id: experimentid });
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

    // Check if an iteration with the name exists in the experiment
    const existingIteration = existingExperiment.iterations.find(
        (iteration: any) => iteration.name === iterationTitle
    );

    if (!existingIteration) {
        console.log("Iteration with the same name doesn't exists");
        return new Response(
        JSON.stringify({
            message: "Iteration with the same name doesn't exists",
        }),
        {
            status: 409,
        }
        );
    }
    else
    {
        const deletedOrNot = await Experiment.updateOne({ _id: experimentid  },
        { $pull: { "iterations.name": iterationTitle } },
        );
        if(deletedOrNot)
        {
            console.log("Iteration has been successfully deleted");
            return new Response(
              JSON.stringify({
                message: "Iteration has been successfully deleted",
              }),
              {
                status: 200,
              }
            );
        }
        else
        {
            console.log("Iteration can not be removed due to error");
            return new Response(
              JSON.stringify({
                message: "Iteration can not be removed due to error",
              }),
              {
                status: 500,
              }
            );

        }

    }
    
}

