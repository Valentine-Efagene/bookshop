export interface IBook {
  _id?: string;
  title: string;
  author: string;
  category?: string;
  thumbnail?: string;
}

export interface IUser {
  _id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface IOrder {
  _id?: string;
  productId: string;
  userId?: string;
}

export interface ISignUpDto {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  passwordConfirm: string;
}

export interface ISignInDto {
  email: string;
  password: string;
}
