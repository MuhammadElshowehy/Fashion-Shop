import { ProductModel } from "./product-model";

export class UserModel {
  public fName: string;
  public lName: string;
  public isLogged?: boolean;
  public email: string;
  public password: string;
  public cart?: ProductModel[];
  public favorite?: ProductModel[];
  public orders?: [];
  constructor(
    fName: string,
    lName: string,
    isLogged: boolean,
    email: string,
    password: string,
    cart: ProductModel[],
    favorite: ProductModel[],
    orders: []
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
