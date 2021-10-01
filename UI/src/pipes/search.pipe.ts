import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  // pure: true
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchKey: any, dataKey:any): any {
    if (!items || !searchKey) {
        return items;
    }
    return items.filter(item => item[dataKey].toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
}
}
