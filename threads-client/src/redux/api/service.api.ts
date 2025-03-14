import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_API_URL } from "@/constant";
import { signInType, logInType, UserProfileType } from "@/redux/api/apiType";
import { addMyInfo } from "@/redux/service.slice";

const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_API_URL}`,
    credentials: "include",
  }),
  keepUnusedDataFor: 60 * 60 * 24 * 7,
  tagTypes: ["Post", "User", "Me"],
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data: signInType) => ({
        url: "users/signin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
    login: builder.mutation({
      query: (data: logInType) => ({
        url: "users/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
    myInfo: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      providesTags: ["Me"],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          console.log("data query my_Info", data.data.user);

          const user = data.data.user as UserProfileType;

          dispatch(addMyInfo(user));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    logoutMe: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
      invalidatesTags: ["Me"],
    }),
  }),
});

export const {
  useSigninMutation,
  useLoginMutation,
  useMyInfoQuery,
  useLogoutMeMutation,
} = serviceApi;

export default serviceApi;
