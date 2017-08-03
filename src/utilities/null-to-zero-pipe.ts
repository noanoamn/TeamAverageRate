import { PipeTransform, Pipe } from '@angular/core';

// NullのObjectをIntのゼロにして返すパイプ
@Pipe({
  name: "nullToZero"
})
export class NullToZeroPipe implements PipeTransform {
  transform(value: number): number{
    let num = 0;
    if(value) {
      num = value;
    }
    return num;
  }
}