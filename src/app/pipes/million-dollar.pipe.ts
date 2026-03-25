import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millionDollar',
  standalone: true
})
export class MillionDollarPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '';

    // caso seja intervalo
    if (value.includes('-')) {
      const [min, max] = value.split('-');
      return `$${min} to $${max} million`;
    }

    // caso simples
    return `$${value} million`;
  }
}