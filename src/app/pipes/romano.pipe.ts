import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'romano'
})
export class RomanoPipe implements PipeTransform {

  transform(n:number): string {
if (n==1) return 'I'
if (n==2) return 'II'
if (n==3) return 'III'
if (n==4) return 'IV'
if (n==5) return 'V'
if (n==6) return 'VI'
if (n==7) return 'VII'
else return ''
  }

}
