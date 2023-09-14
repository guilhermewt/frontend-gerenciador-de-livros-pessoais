export class Book{
    id?:number
    title:string = ''
    statusBook:string = ''
    authors:string = ''
    imageLink:string = ''
    description:string = ''
    genrers:Genrers[] = []

    constructor(title:string, statusBook:string,authors:string
        ,imageLinks:string,description:string,genrers:Genrers[]){
        this.title = title;
        this.statusBook = statusBook;
        this.authors = authors;
        this.imageLink = imageLinks;
        this.description = description;
        this.genrers = genrers
    }
}

export class Genrers{
    id?:number
    name:string = ''
}

export class Content{
    id?:number
    title:string = ''
    statusBook:string = ''
    authors:string = ''
    imageLink:string = ''
    description:string = ''
    genrers:Genrers[] = []

    constructor(title:string, statusBook:string,authors:string
        ,imageLinks:string,description:string,genrers:Genrers[]){
        this.title = title;
        this.statusBook = statusBook;
        this.authors = authors;
        this.imageLink = imageLinks;
        this.description = description;
        this.genrers = genrers
    }
}