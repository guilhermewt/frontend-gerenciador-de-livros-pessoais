export class Book{
    id?:number
    title:string = ''
    statusBook:string = ''
    authors!:string
    imageLink!:string
    description:string = ''

    constructor(title:string, statusBook:string,authors:string,imageLinks:string,description:string){
        this.title = title;
        this.statusBook = status;
        this.authors = authors;
        this.imageLink = imageLinks;
        this.description = description;
    }
}