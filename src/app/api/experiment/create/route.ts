import { Experiment } from "@/types/database/Experiment";
import dbConnect from "@/helper/dbConnect";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { title, description } = z
    .object({ title: z.string(), description: z.string() || z.undefined() })
    .parse(body);

  console.log(title, description);

  await dbConnect();

  try {
    const newExperiment = Experiment.create({
      title,
      description,
      // members: ["owner"],
    });

    return new Response(
      JSON.stringify({
        message: "Experiment created",
        experiment: newExperiment,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error creating experiment",
      }),
      {
        status: 500,
      }
    );
  }
}
