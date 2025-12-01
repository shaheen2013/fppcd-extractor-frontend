"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PlanningApplicationsReport() {
  const applications = [
    {
      name: "Riverside Development",
      address: "123 Thames Street, London SW1 4AA",
      conditions: ["Heritage Assessment Required", "Archaeological Survey"],
      status: "Approved",
      contacted: "No",
    },
    {
      name: "Oak Tree Housing",
      address: "45 Conservation Road, Bath BA2 3RL",
      conditions: ["Tree Preservation Order", "Landscaping Plan"],
      status: "Approved",
      contacted: "Yes",
    },
    {
      name: "Historic Mill Conversion",
      address: "78 Mill Lane, York YO1 9AB",
      conditions: ["Listed Building Consent", "Ecology Survey"],
      status: "Rejected",
      contacted: "No",
    },
  ];

  return (
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
            <Link href="/">Custom Report</Link>
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
              Found 3 applications matching your selected conditions
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

        <div className="px-6 pb-6">
          <p className="text-gray-600 mb-4">
            Found 3 applications matching your selected conditions
          </p>

          <input
            type="text"
            placeholder="Search applications..."
            className="w-full border rounded-lg p-2 mb-4"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="p-3">Application Name</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Conditions</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Contacted</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium text-blue-800">
                      {app.name}
                    </td>
                    <td className="p-3 text-gray-700">{app.address}</td>
                    <td className="p-3 flex flex-wrap gap-2">
                      {app.conditions.map((c, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                        >
                          {c}
                        </span>
                      ))}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          app.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          app.contacted === "Yes"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {app.contacted}
                      </span>
                    </td>
                    <td className="p-3">
                      {app.contacted === "No" ? (
                        <Button className="bg-green-600 text-white hover:bg-green-700">
                          Mark as Contacted
                        </Button>
                      ) : (
                        <Button className="bg-red-600 text-white hover:bg-red-700">
                          Mark as Not Contacted
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
