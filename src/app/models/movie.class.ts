export class Movie{
    public _id:string;
    public page:number;
    public name:string;
    public link:string;
    public author:string;
    public show:boolean;
    public hl:boolean;
    constructor(_id:string,page:number,name:string,link:string,author:string,show:boolean,hl:boolean){
        this._id=_id;
        this.page=page;
        this.name=name;
        this.link=link;
        this.author=author;
        this.show=true;
        this.hl=false;
    }
}