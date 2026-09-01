import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // KREIRANJE PORUDŽBINE
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: { ...order },
            }),
            invalidatesTags: ['Order'],
        }),

        // ISTORIJA PORUDŽBINA
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorders`,
            }),
            providesTags: ['Order'],
        }),

        // OZNAČAVANJE GOTOVINSKE PORUDŽBINE KAO PLAĆENE
        markOrderAsPaid: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetMyOrdersQuery,
    useMarkOrderAsPaidMutation,
} = ordersApiSlice;