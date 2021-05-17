export default class Card {

  public id: string;
  public title: string;
  public month: number;
  public image: string;
  public open: boolean;

  constructor(id: string, title: string, month: number, image: string, open: boolean = false) {
    this.id = id;
    this.title = title;
    this.month = month;
    this.image = image;
    this.open = open
  }

  toString(): string {
    return this.title;
  }
}
