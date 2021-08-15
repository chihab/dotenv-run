import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'env',
})
export class EnvPipe implements PipeTransform {
  transform(variable: string): unknown {
    return process.env[variable];
  }
}
