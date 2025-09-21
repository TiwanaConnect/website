import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { UserService } from "@/api/services/user";
import { LoginRequest, LoginResponse } from "@/common/interface";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000", // your backend
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      //   query: (body) => ({
      //     url: "/auth/login",
      //     method: "POST",
      //     body,
      //   }),
      queryFn: async (body: LoginRequest) => {
        try {
          const result = UserService.login(body);

          if (!result) {
            return {
              error: { status: 401, data: "Invalid credentials" },
            };
          }

          return { data: result };
        } catch (err) {
          return { error: { status: 500, data: err } };
        }
      },
    }),
  }),
});

export const { useLoginMutation } = api;
