import spawn from "cross-spawn";

export const run = (cmd: string, args: string[]) => {
  spawn(cmd, args, { stdio: "inherit" }).on(
    "exit",
    function (exitCode, signal) {
      if (typeof exitCode === "number") {
        process.exit(exitCode);
      } else {
        process.kill(process.pid, signal);
      }
    }
  );
};
