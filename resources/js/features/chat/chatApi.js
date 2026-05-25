import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api', credentials: 'include' }),
    tagTypes: [],
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            query: (messages) => ({
                url: '/chat',
                method: 'POST',
                body: { messages },
            }),
        }),
    }),
});

export const { useSendMessageMutation } = chatApi;
