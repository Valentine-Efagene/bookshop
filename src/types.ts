export interface IBook {
  _id?: string;
  title: string;
  author: string;
  description?: string;
  category?: string;
  thumbnail?: string;
  price: number;
  stock: number;
}

export interface IProduct {
  _id?: string;
  book: IBook;
  quantity: number;
  buyer?: string;
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

export interface ICategory {
  _id?: string;
  name: string;
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

export interface IAddBookDto {
  title: string;
  author: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: File | undefined;
}
