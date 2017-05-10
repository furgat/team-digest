import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name : 'myValues'})
export class ValuesPipe implements PipeTransform {
  public transform(value: any, args?: any[]): Object[] {
    return Object.keys(value).map((key) => {
      return {
        key,
        data: value[key] ? value[key] : []
      };
    });
  }
}
