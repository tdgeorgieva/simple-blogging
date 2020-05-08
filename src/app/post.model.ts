export enum Status {
    Active, Inactive
}
export type IdType = number;
export interface Identifiable {
    id: IdType;
}
export class Post implements Identifiable {
    id: IdType;
    date: Date;
    title: string;
    author: string;
    text: string;
    status: Status;
    imageURL?: string;
    tags?: string[];
    constructor(id: IdType,
                date: Date,
                title: string,
                author: string,
                content: string,
                status: Status,
                imageURL?: string,
                keywords?: string[]) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.author = author;
        this.text = content;
        this.status = status;
        this.imageURL = imageURL;
        this.tags = keywords;
    }
}
