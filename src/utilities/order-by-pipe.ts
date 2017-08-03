import { PipeTransform, Pipe } from '@angular/core';

// 配列をObjectのKeyの降順でソートするパイプ
// 以下を参考に
// https://stackoverflow.com/questions/35158817/angular-2-orderby-pipe
@Pipe({
  name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    if(array && array.length > 0) {
        array.sort((a: any, b: any) => {
        if (a[field] > b[field]) {
            return -1;
        } else if (a[field] < b[field]) {
            return 1;
        } else {
            return 0;
        }
        });
    }
    return array;
  }
}