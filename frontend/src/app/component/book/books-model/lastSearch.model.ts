export class lastSearch{
    lastTitleSearch:Boolean = false;
    lastGenrerSearch:Boolean = false;
    lastAuthorSearch:Boolean = false;
    lastStatusSearch:Boolean = false;
    lastAllSearch:Boolean = false;

    constructor(title:Boolean,genrer:Boolean,author:Boolean,status:Boolean,allSearch:Boolean){
        this.lastTitleSearch = title;
        this.lastGenrerSearch = genrer;
        this.lastAuthorSearch = author;
        this.lastStatusSearch = status;
        this.lastAllSearch = allSearch;
    }
   
}