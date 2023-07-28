export interface ObjectApiBook{
    kind:string
    items:ItemsBook[]
}

export interface ItemsBook{
    volumeInfo:BookApi
    id:string
}

export interface volumeInfo{
    title:string
    authors:string
    imageLinks:image
}

export class BookApi{
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