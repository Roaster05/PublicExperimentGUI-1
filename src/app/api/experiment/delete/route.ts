import dbConnect from "@/helper/dbConnect";
import { Experiment } from "@/types/database/Experiment";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { ids } = z.object({ ids: z.array(z.string()) }).parse(body);

  await dbConnect();
  try {
    const result = await Experiment.deleteMany({ _id: { $in: ids } });
    return new Response(
      JSON.stringify({
        message: "Experiment deleted",
        result,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error deleting experiment",
      }),
      {
        status: 500,
      }
    );
  }
}
