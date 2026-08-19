import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (data) => ({
                url: USERS_URL + "/login",
                method: "POST",
                body: data,
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: USERS_URL,
                method: "POST",
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: USERS_URL + "/logout",
                method: "POST",
            }),
        }),

        updateProfile: builder.mutation({
            query: (userData) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: userData,
            }),
        }),

        addCard: builder.mutation({
            query: (data) => ({
                url: USERS_URL + "/cards",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Card"],
        }),

        getCards: builder.query({
            query: () => ({
                url: USERS_URL + "/cards",
            }),
            providesTags: ["Card"],
        }),

        deleteCard: builder.mutation({
            query: (cardId) => ({
                url: USERS_URL + `/cards/${cardId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Card"],
        }),

    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useUpdateProfileMutation,
    useAddCardMutation,
    useGetCardsQuery,
    useDeleteCardMutation,
} = userApiSlice;