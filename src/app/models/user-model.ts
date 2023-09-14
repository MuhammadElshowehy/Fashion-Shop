export class UserModel {
  public fName?: string;
  public lName?: string;
  public isLogged?: boolean;
  public email: string;
  public password: string;
  constructor(
    fName: string,
    lName: string,
    isLogged: boolean,
    email: string,
    password: string
  ) {
    this.fName = fName;
    this.lName = lName;
    this.isLogged = isLogged;
    this.email = email;
    this.password = password;
  }
}
