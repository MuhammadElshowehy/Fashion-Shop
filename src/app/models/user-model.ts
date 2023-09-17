import { OrderModel } from "./order.model";
import { ProductModel } from "./product-model";

export class UserModel {
  public fName: string;
  public lName: string;
  public isLogged?: boolean;
  public email: string;
  public password: string;
  public cart?: ProductModel[];
  public favorite?: ProductModel[];
  public orders?: OrderModel[];
  constructor(
    fName: string,
    lName: string,
    isLogged: boolean,
    email: string,
    password: string,
    cart: ProductModel[],
    favorite: ProductModel[],
    orders: OrderModel[]
  ) {
    this.fName = fName;
    this.lName = lName;
    this.isLogged = isLogged;
    this.email = email;
    this.password = password;
    this.cart = cart;
    this.favorite = favorite;
    this.orders = orders;
  }
}
