export class Livro{
    id?:number
    title:string = ''
    status:string = ''
    authors:string = ''
    imageLinks!:image
}

export class image{
    thumbnail:string = ''
}