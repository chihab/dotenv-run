import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'env',
})
export class EnvPipe implements PipeTransform {
  transform(variable: string): string {
    const _variable = variable.replace(/^process.env./i, '');
    return _variable === 'NODE_ENV'
      ? process.env.NODE_ENV
      : process.env[_variable];
  }
}
