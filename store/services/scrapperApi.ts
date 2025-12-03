import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface Application {
  id: string;
  application_number: string;
  address: string;
  status: string;
  decision_date?: string;
  // Add other fields as needed based on your API response
}

export interface GetApplicationsParams {
  page?: number;
  page_size?: number;
  borough?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  sort?: string;
}

export interface UpdateApplicationStatusRequest {
  application_ref: string;
  contacted: boolean;
  actions: boolean;
}

export interface UpdateApplicationStatusResponse {
  success: boolean;
  message?: string;
}

export const scrapperApi = createApi({
  reducerPath: "scrapperApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
  }),
  tagTypes: ["Applications"],
  endpoints: (builder) => ({
    getApplications: builder.query<any, GetApplicationsParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params) {
          if (params.page !== undefined)
            queryParams.append("page", params.page.toString());
          if (params.page_size !== undefined)
            queryParams.append("page_size", params.page_size.toString());
          if (params.borough) queryParams.append("borough", params.borough);
          if (params.status) queryParams.append("status", params.status);
          if (params.start_date)
            queryParams.append("start_date", params.start_date);
          if (params.end_date) queryParams.append("end_date", params.end_date);
          if (params.sort) queryParams.append("sort", params.sort);
        }

        return {
          url: `/api/v1/applications${
            queryParams.toString() ? `?${queryParams.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["Applications"],
    }),
    updateApplicationStatus: builder.mutation<
      UpdateApplicationStatusResponse,
      UpdateApplicationStatusRequest
    >({
      query: (data) => ({
        url: "/api/v1/application-status",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Applications"],
    }),
  }),
});

export const { useGetApplicationsQuery, useUpdateApplicationStatusMutation } =
  scrapperApi;
