import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncatePipe',
})
export class TruncatePipePipe implements PipeTransform {
  transform(value: string, limit: number): unknown {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }
}
