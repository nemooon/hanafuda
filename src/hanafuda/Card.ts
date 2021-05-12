export default class Card {

    public id: string;
    public title: string;
    public month: number;
    public image: string;

    constructor(id: string, title: string, month: number, image: string) {
        this.id = id;
        this.title = title;
        this.month = month;
        this.image = image;
    }

    toString(): string {
        return this.title;
    }
}
