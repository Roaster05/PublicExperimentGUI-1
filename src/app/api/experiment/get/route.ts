import { Experiment } from "@/types/database/Experiment";
import dbConnect from "@/helper/dbConnect";

export async function GET(req: Request, res: Response) {
  await dbConnect();

  try {
    const dbExperiments = await Experiment.find(
      {},
      { title: 1, description: 1, owner: 1, lastModified: 1, createdAt: 1 }
    );

    return new Response(
      JSON.stringify({
        message: "Experiments found",
        experiments: dbExperiments.map((dbExperiment) => ({
          id: dbExperiment._id,
          title: dbExperiment.title,
          description: dbExperiment.description,
          owner: dbExperiment.owner, // TODO: change to owner
          lastModified: dbExperiment.lastModified,
          created: dbExperiment.createdAt,
        })),
        // experiments: dbExperiments,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error getting experiment",
      }),
      {
        status: 500,
      }
    );
  }
}
