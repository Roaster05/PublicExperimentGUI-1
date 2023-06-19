import { Experiment } from "@/types/database/Experiment";
import dbConnect from "@/helper/dbConnect";
import { z } from "zod";


export async function GET(req: Request, res: Response) {

    const body = await req.json();

    const { experimentid } = z
      .object({
        experimentid: z.string(),
        
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


    return new Response(
      JSON.stringify({
        message: "Iterations found",
        experiments: existingExperiment.iterations
        
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
