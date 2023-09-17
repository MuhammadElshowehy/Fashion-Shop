import { ProductModel } from './product-model';

export class OrderModel {
  public products: ProductModel[];
  public totalWithOutShipping: number;
  public totalWithShipping: number;
  public fullName: string;
  public streetAddress: string;
  public city: string;
  public phone: number;
  public arrivalDate: string;
  constructor(
    products: ProductModel[],
    totalWithOutShipping: number,
    totalWithShipping: number,
    fullName: string,
    streetAddress: string,
    city: string,
    phone: number,
    arrivalDate: string
  ) {
    this.products = products;
    this.totalWithOutShipping = totalWithOutShipping;
    this.totalWithShipping = totalWithShipping;
    this.fullName = fullName;
    this.streetAddress = streetAddress;
    this.city = city;
    this.phone = phone;
    this.arrivalDate = arrivalDate;
  }
}
