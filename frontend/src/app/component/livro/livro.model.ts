export class Livro{
    id?:number
    title:string = ''
    status:string = ''
    authors:string[] = []
    imageLinks!:image
    description:string = ''
}

export class image{
    thumbnail:string = ''
}