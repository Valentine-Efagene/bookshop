// Need to use the React-specific entry point to import createApi
// https://redux-toolkit.js.org/rtk-query/usage/mutations

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  IBook,
  ICategory,
  ICreateOrderDto,
  IOrder,
  IPaginationParams,
  IProduct,
  ISignInDto,
  ISignUpDto,
} from "../types";
import { RootState } from "../store";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    // https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#common-usage-patterns
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Product", "Order", "Book", "Category"],
  endpoints: (builder) => ({
    signUp: builder.mutation<{ access_token: string }, ISignInDto>({
      // AUTHENTICATION
      query: (credentials: ISignUpDto) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: credentials,
        };
      },
    }),
    signIn: builder.mutation<{ access_token: string }, ISignInDto>({
      query: (credentials: ISignInDto) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),

    // BOOKS
    getAllBooks: builder.query<IBook[], void>({
      query: () => "/books",
      providesTags: ["Book"],
    }),
    addBook: builder.mutation<Response, FormData>({
      query: (book: FormData) => ({
        url: `/books`,
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBookById: builder.mutation<IBook, { id: string; formData: FormData }>(
      {
        query: ({ id, formData }) => {
          return {
            url: `/books/${id}`,
            method: "PATCH",
            body: formData,
          };
        },
        invalidatesTags: ["Book"],
      }
    ),
    getBookById: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),
    deleteBookById: builder.mutation<Response, string>({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),

    // PRODUCTS
    getAllProducts: builder.query<IProduct[], IPaginationParams>({
      query: ({ page, limit }) => ({
        url: `/products`,
        params: { page, limit },
      }),
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(
                ({ _id }) => ({ type: "Product", id: _id } as const)
              ),
              { type: "Product", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Product", id: "LIST" }],
    }),
    addProductToCart: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: "/products/",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteProductById: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // CATEGORIES
    getAllCategories: builder.query<ICategory[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query<ICategory, string>({
      query: (id) => `/categories/${id}`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<string, ICategory>({
      query: (category) => ({
        url: "/categories/",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategoryById: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // ORDERS
    getAllOrders: builder.query<IOrder[], void>({
      query: () => "/orders",
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: "Order", id: _id } as const)),
              { type: "Order", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Order", id: "LIST" }],
    }),
    getOrderById: builder.query<IOrder, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    updateOrderById: builder.mutation<
      IOrder,
      Partial<IOrder> & Pick<IOrder, "_id">
    >({
      query: ({ _id, ...patch }) => {
        return {
          url: `/orders/${_id}`,
          method: "PATCH",
          body: patch,
        };
      },
      invalidatesTags: ["Order"],
    }),
    createOrder: builder.mutation<IOrder, ICreateOrderDto>({
      query: (order: ICreateOrderDto) => ({
        url: "/orders/",
        method: "POST",
        body: order,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // Auth and Profile
  useSignInMutation,
  useSignUpMutation,
  useGetProfileQuery,

  // Books
  useAddBookMutation,
  useGetBookByIdQuery,
  useUpdateBookByIdMutation,
  useDeleteBookByIdMutation,
  useGetAllBooksQuery,

  // Products
  useAddProductToCartMutation,
  useGetAllProductsQuery,
  useDeleteProductByIdMutation,

  // Categories
  useCreateCategoryMutation,
  useDeleteCategoryByIdMutation,
  useGetAllCategoriesQuery,

  // Orders
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderByIdMutation,
} = api;
