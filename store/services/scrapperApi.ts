import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface Application {
  "Application Name": string;
  Address: string;
  Conditions: Record<string, any>;
  Status: string;
  Application_Ref: string;
  Decision: string;
  "Decisions Conditions": Record<string, any>;
  UPRN: string;
  "Decision Date": string;
  Borough: string;
  Contacted: boolean;
  Actions: boolean;
  "URL Planning App": string;
  "LPA App No": string;
}

export interface GetApplicationsParams {
  page?: number | null;
  page_size?: number | null;
  borough?: string | null;
  status?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  sort?: string | null;
  search?: string | null;
}

export interface GetApplicationsByConditionParams {
  condition: string;
  page?: number | null;
  page_size?: number | null;
  borough?: string | null;
  status?: string | null;
  search?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  sort?: string | null;
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
          if (params.page !== undefined && params.page !== null)
            queryParams.append("page", params.page.toString());
          if (params.page_size !== undefined && params.page_size !== null)
            queryParams.append("page_size", params.page_size.toString());
          if (params.borough) queryParams.append("borough", params.borough);
          if (params.status) queryParams.append("status", params.status);
          if (params.start_date)
            queryParams.append("start_date", params.start_date);
          if (params.end_date) queryParams.append("end_date", params.end_date);
          if (params.sort) queryParams.append("sort", params.sort);
          if (params.search) queryParams.append("search", params.search);
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
    getApplicationsByCondition: builder.query<
      any,
      GetApplicationsByConditionParams
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();

        // condition is required
        queryParams.append("condition", params.condition);

        if (params.page !== undefined && params.page !== null)
          queryParams.append("page", params.page.toString());
        if (params.page_size !== undefined && params.page_size !== null)
          queryParams.append("page_size", params.page_size.toString());
        if (params.borough) queryParams.append("borough", params.borough);
        if (params.status) queryParams.append("status", params.status);
        if (params.start_date)
          queryParams.append("start_date", params.start_date);
        if (params.end_date) queryParams.append("end_date", params.end_date);
        if (params.sort) queryParams.append("sort", params.sort);
        if (params.search) queryParams.append("search", params.search);

        return {
          url: `/api/v1/applications-by-condition?${queryParams.toString()}`,
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

export const {
  useGetApplicationsQuery,
  useGetApplicationsByConditionQuery,
  useUpdateApplicationStatusMutation,
} = scrapperApi;
