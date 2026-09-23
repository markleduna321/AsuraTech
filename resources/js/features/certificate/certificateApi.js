import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
	return null;
}

export const certificateApi = createApi({
	reducerPath: 'certificateApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
		credentials: 'include',
		prepareHeaders: (headers) => {
			headers.set('Accept', 'application/json');
			const token = getCookie('XSRF-TOKEN');
			if (token) {
				headers.set('X-XSRF-TOKEN', token);
			}
			return headers;
		},
	}),
	tagTypes: ['Certificate'],
	endpoints: (builder) => ({
		// Public — fetch single certificate by UUID (no auth required)
		getCertificate: builder.query({
			query: (uuid) => `/certificates/${uuid}`,
			providesTags: (result, error, uuid) => [{ type: 'Certificate', id: uuid }],
		}),

		// Admin — paginated list of certificates
		getCertificates: builder.query({
			query: ({ page = 1, perPage = 15, search = '' } = {}) => {
				const params = new URLSearchParams({
					page: String(page),
					per_page: String(perPage),
				});
				if (search) params.append('search', search);
				return `/certificates?${params.toString()}`;
			},
			providesTags: (result) =>
				result?.data
					? [
						...result.data.map((cert) => ({ type: 'Certificate', id: cert.uuid })),
						{ type: 'Certificate', id: 'LIST' },
					]
					: [{ type: 'Certificate', id: 'LIST' }],
		}),

		// Admin — create a single certificate
		createCertificate: builder.mutation({
			query: (body) => ({
				url: '/certificates',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Certificate', id: 'LIST' }],
		}),

		// Admin — bulk create certificates from CSV
		bulkCreateCertificates: builder.mutation({
			query: (formData) => ({
				url: '/certificates/bulk',
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: [{ type: 'Certificate', id: 'LIST' }],
		}),

		// Admin — update a certificate
		updateCertificate: builder.mutation({
			query: ({ uuid, body }) => ({
				url: `/certificates/${uuid}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: (result, error, { uuid }) => [
				{ type: 'Certificate', id: uuid },
				{ type: 'Certificate', id: 'LIST' },
			],
		}),

		// Admin — delete a certificate
		deleteCertificate: builder.mutation({
			query: (uuid) => ({
				url: `/certificates/${uuid}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Certificate', id: 'LIST' }],
		}),
	}),
});

export const {
	useGetCertificateQuery,
	useGetCertificatesQuery,
	useCreateCertificateMutation,
	useBulkCreateCertificatesMutation,
	useUpdateCertificateMutation,
	useDeleteCertificateMutation,
} = certificateApi;
