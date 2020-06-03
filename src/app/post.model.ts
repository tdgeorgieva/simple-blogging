// export type IdType = number;
// export interface Identifiable {
//     id: IdType;
// }              implements Identifiable
export class Post  {
    _id: string;
    date: Date;
    title: string;
    author: string;
    text: string;
    status: boolean;
    imageURL?: string;
    tags: string[];
    constructor(
                date: Date,
                title: string,
                author: string,
                text: string,
                status: boolean,
                tags: string[],
                imageURL?: string,
               ) {
        this.date = date;
        this.title = title;
        this.author = author;
        this.text = text;
        this.tags = tags;
        this.imageURL = imageURL;
        this.status = status;
    }
}
