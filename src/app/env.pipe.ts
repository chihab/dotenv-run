import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'env',
})
export class EnvPipe implements PipeTransform {
  transform(variable: string): unknown {
    console.log('env', process.env);
    return process.env[variable];
  }
}
