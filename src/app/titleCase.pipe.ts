import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name:'titleCase'
})
export class titleCase implements PipeTransform{
    transform(txt:string):string{
        let temp=txt.trim().split(' ');
        let res='';
        temp.forEach(e=>{
            res+=e[0].toUpperCase()+e.slice(1)+' ';
        });
        let l=res.length;
        //res=res.slice(l-1);
        return res;
    }
}