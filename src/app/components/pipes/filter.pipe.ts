import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const sub of value){
      if(sub.title.indexOf(arg) > -1){
         resultPosts.push(sub);
      };
    };
    return resultPosts;
  }

}