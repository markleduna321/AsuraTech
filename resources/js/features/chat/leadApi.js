import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const leadApi = createApi({
    reducerPath: 'leadApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api', credentials: 'include' }),
    tagTypes: ['Lead'],
    endpoints: (builder) => ({
        submitLead: builder.mutation({
            query: (body) => ({
                url: '/leads',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Lead'],
        }),
    }),
});

export const { useSubmitLeadMutation } = leadApi;
