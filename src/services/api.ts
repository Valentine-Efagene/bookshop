// Need to use the React-specific entry point to import createApi
// https://redux-toolkit.js.org/rtk-query/usage/mutations
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ISignInDto, ISignUpDto } from "../types";
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
  endpoints: (builder) => ({
    signUp: builder.mutation<ISignUpDto, object>({
      // AUTHENTICATION
      query: (credentials: ISignUpDto) => {
        console.log(credentials);
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
    getAllBooks: builder.query<string, string>({
      query: (id: string) => `books/${id}`,
    }),
    getBookById: builder.query<string, string>({
      query: () => `books`,
    }),
    deleteBookById: builder.query<string, string>({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSignInMutation,
  useSignUpMutation,
  useGetBookByIdQuery,
  useDeleteBookByIdQuery,
  useGetAllBooksQuery,
  useGetProfileQuery,
} = api;
