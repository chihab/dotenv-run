import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "env",
})
export class EnvPipe implements PipeTransform {
  transform(variable: string): string | undefined {
    const _variable = variable.replace(/^process.env./, "");
    return _variable === "NG_APP_ENV"
      ? process.env.NG_APP_ENV
      : process.env[_variable];
  }
}
