import { Experiment } from "@/types/database/Experiment";
import dbConnect from "@/helper/dbConnect";
import { z } from "zod";


export async function GET(req: Request, res: Response) {

    const body = await req.json();

    const { experimentid, iterationTitle} = z
      .object({
        experimentid: z.string(),
        iterationTitle: z.string(),
      })
      .parse(body);  
  await dbConnect();

  try {
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

    

    return new Response(
      JSON.stringify({
        message: "Iteration found",
        id:existingIteration._id,
        //otherdetails
        
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error getting iteration",
      }),
      {
        status: 500,
      }
    );
  }
}
