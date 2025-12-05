"use client";

import Header from "@/app/components/header";
import { Button } from "@/components/ui/button";
import {
  useGetApplicationsByConditionQuery,
  useUpdateApplicationStatusMutation,
} from "@/store/services/scrapperApi";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { useDebounceValue } from "usehooks-ts";

function PlanningApplicationsReportContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const conditions = searchParams.get("conditions") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounceValue(searchQuery, 500);
  const pageSize = 10;

  console.log("conditions => ", conditions);

  const {
    data: dataApplications,
    isFetching: fetchingApplications,
    error: errorGettingApplications,
  } = useGetApplicationsByConditionQuery({
    condition: conditions,
    page: currentPage,
    page_size: pageSize,
    search: debouncedSearch,
  });

  const [updateApplicationStatus, { isLoading: isUpdating }] =
    useUpdateApplicationStatusMutation();

  const totalPages = dataApplications?.total
    ? Math.ceil(dataApplications.total / pageSize)
    : 0;

  const handlePageChange = (selectedItem: { selected: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (selectedItem.selected + 1).toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleMark = async (app: any) => {
    console.log("handleMark called with => ", app);

    try {
      const result = await updateApplicationStatus({
        application_ref: app["Application_Ref"],
        contacted: !app.Contacted,
        actions: true,
      }).unwrap();

      console.log("update result => ", result);

      if (result.message) {
        toast.success(result.message);
      }
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  if (errorGettingApplications) {
    return (
      <>
        <Header subtitle="Report Results" />
        <div className="p-9 bg-[F8FAFC] min-h-screen">
          <div className="container mx-auto">
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-red-600">
                Error Loading Applications
              </h2>
              <p className="mt-4 text-gray-600">
                There was an error fetching the planning applications. Please
                try again later.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header subtitle="Report Results" />
      <div className="p-9 bg-[F8FAFC] min-h-screen">
        <div className="container mx-auto mb-9">
          <div className="flex gap-4">
            <Button variant="outlineBlue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mr-1"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              <Link href="/"> Home</Link>
            </Button>

            <Button variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
                aria-hidden="true"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              <Link href="/"> Back to Selection</Link>
            </Button>

            <Button variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-text mr-1 h-4 w-4"
                aria-hidden="true"
              >
                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
              <Link href="/custom-report">Custom Report</Link>
            </Button>
          </div>
        </div>

        <div className="container mx-auto bg-white shadow rounded-xl ">
          <div className="flex justify-between items-center mb-6 px-6 py-7 bg-blue-50">
            <div>
              <h1 className="text-2xl font-normal text-gray-700 mb-1">
                Planning Applications Report
              </h1>

              <p className="font-normal text-gray-500">
                Found {dataApplications?.total} applications matching your
                selected conditions
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="font-semibold hover:bg-transparent"
                onClick={() => {
                  // print the page
                  print();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-printer mr-1 h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"></path>
                  <rect x="6" y="14" width="12" height="8" rx="1"></rect>
                </svg>
                Print
              </Button>

              <Button
                variant="outline"
                className="font-semibold hover:bg-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-download mr-1 h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 15V3"></path>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <path d="m7 10 5 5 5-5"></path>
                </svg>
                CSV
              </Button>

              <Button
                variant="outline"
                className="font-semibold hover:bg-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-file-text mr-1 h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                  <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                </svg>
                PDF
              </Button>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full border rounded-lg p-2 pl-10 input-bootstrap placeholder:font-light placeholder:text-gray-600"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>

            <div className="overflow-x-auto">
              {fetchingApplications ? (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F7F9FB] text-sm">
                    <tr className="border-b text-gray-900">
                      <th className="p-2 font-medium">Application Name</th>
                      <th className="p-2 font-medium">Address</th>
                      <th className="p-2 font-medium">Conditions</th>
                      <th className="p-2 font-medium">Status</th>
                      <th className="p-2 font-medium">Contacted</th>
                      <th className="p-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-3">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        </td>
                        <td className="p-3">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                        <td className="p-3">
                          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                        <td className="p-3">
                          <div className="h-9 w-36 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F7F9FB] text-sm">
                    <tr className="border-b text-gray-900">
                      <th className="p-2 font-medium">Application Name</th>
                      <th className="p-2 font-medium">Address</th>
                      <th className="p-2 font-medium">Conditions</th>
                      <th className="p-2 font-medium">Status</th>
                      <th className="p-2 font-medium">Contacted</th>
                      <th className="p-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataApplications?.data?.map((app: any, idx: any) => {
                      // console.log("application => ", app);
                      return (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium text-sm min-w-[200px]">
                            {app["Application Name"] || "N/A"}
                          </td>
                          <td className="p-3 font-normal text-sm min-w-[250px]">
                            {app["Address"] || "N/A"}
                          </td>
                          <td className="p-3 flex flex-wrap gap-2 mt-2">
                            {Array.isArray(app["Conditions"]) ? (
                              app["Conditions"].map((c: any, i: any) => (
                                <span
                                  key={i}
                                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
                                >
                                  {c}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 text-xs">
                                No conditions
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-3 py-1 rounded-md text-xs font-semibold ${
                                app.Status === "Approved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {app.Status}
                            </span>
                          </td>

                          <td className="p-3">
                            <span
                              className={`px-3 py-1 rounded-md text-xs font-semibold ${
                                app.Contacted
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {app.Contacted ? "Yes" : "No"}
                            </span>
                          </td>

                          <td className="p-3">
                            {app.Contacted ? (
                              <Button
                                onClick={() => handleMark(app)}
                                disabled={isUpdating}
                                className="text-red-600 bg-transparent border border-red-400
                            hover:text-black hover:bg-red-50 disabled:opacity-50"
                              >
                                Mark as Not Contacted
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handleMark(app)}
                                disabled={isUpdating}
                                className="text-green-700 bg-transparent border border-green-500
                            hover:text-black hover:bg-green-50 disabled:opacity-50"
                              >
                                Mark as Contacted
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}

                    {dataApplications?.data?.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="p-6 text-center text-gray-600"
                        >
                          No applications found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={totalPages}
                onPageChange={handlePageChange}
                forcePage={currentPage - 1}
                containerClassName={"flex items-center gap-2"}
                pageClassName={"border border-gray-300 rounded-md"}
                pageLinkClassName={"px-3 py-2 block cursor-pointer"}
                activeClassName={"bg-blue-600 text-white border-blue-600"}
                activeLinkClassName={"text-white"}
                previousClassName={
                  "border border-gray-300 rounded-md cursor-pointer select-none"
                }
                previousLinkClassName={
                  "px-3 py-2 block hover:bg-gray-50 transition-colors"
                }
                nextClassName={
                  "border border-gray-300 rounded-md cursor-pointer select-none"
                }
                nextLinkClassName={
                  "px-3 py-2 block hover:bg-gray-50 transition-colors"
                }
                disabledClassName={"opacity-50 cursor-not-allowed"}
                breakLabel={"..."}
                breakClassName={"px-3 py-2"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PlanningApplicationsReport() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlanningApplicationsReportContent />
    </Suspense>
  );
}
