import { spawn } from "child_process";

let monitorProcess = global.monitorProcess;

export async function POST(req: Request, res: Response) {
  if (!monitorProcess) {
    monitorProcess = global.monitorProcess = spawn("ts-node", ["src/helper/monitor.ts"], {
      detached: true,
      stdio: "inherit",
    });
    monitorProcess.unref();
    return new Response(
      JSON.stringify({
        message: "Monitor started",
      }),
      {
        status: 200,
      }
    );
  } else {
    JSON.stringify({
      message: "Monitor started",
    }),
      {
        status: 200,
      };
  }
}
