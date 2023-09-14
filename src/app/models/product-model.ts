export class ProductModel {
  public category: string;
  public description: string;
  public id: number;
  public image: string;
  public price: number;
  public quantity?: number;
  public rating: {
    rate: number;
    count: number;
  };
  public count: number;
  public title: string;
  constructor(
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    quantity: number,
    rating: {
      rate: number;
      count: number;
    },
    title: string
  ) {
    this.category = category;
    this.description = description;
    this.id = id;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.rating = rating;
    this.title = title;
  }
}
