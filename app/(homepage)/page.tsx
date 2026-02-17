"use client";

import Header from "../components/header";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JSX } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const [selectedCondition, setSelectedCondition] = useState<string>("");

  const planningConditions = [
    {
      name: "Heritage & Listed Buildings",
      href: "/report?data=1",
      value: "Heritage",
      icon: (
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
          className="stroke-blue-700"
        >
          <path d="M10 12h4"></path>
          <path d="M10 8h4"></path>
          <path d="M14 21v-3a2 2 0 0 0-4 0v3"></path>
          <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
          <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
        </svg>
      ),
    },

    {
      name: "Archaeology",
      href: "/report?data=1",
      value: "Archaeology",

      icon: (
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
          className="lucide lucide-search h-6 w-6 text-blue-600"
          aria-hidden="true"
        >
          <path d="m21 21-4.34-4.34"></path>
          <circle cx="11" cy="11" r="8"></circle>
        </svg>
      ),
    },

    {
      name: "Conservation Areas",
      href: "/report?data=1",
      value: "Conservation",

      icon: (
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
          className="lucide lucide-shield h-6 w-6 text-blue-600"
          aria-hidden="true"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        </svg>
      ),
    },

    {
      name: "Landscaping",
      href: "/report?data=1",
      value: "Landscaping",
      icon: (
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
          className="lucide lucide-trees h-6 w-6 text-blue-600"
          aria-hidden="true"
        >
          <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"></path>
          <path d="M7 16v6"></path>
          <path d="M13 19v3"></path>
          <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"></path>
        </svg>
      ),
    },

    {
      name: "Ecology",
      href: "/report?data=1",
      value: "Ecology",
      icon: (
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
          className="lucide lucide-leaf h-6 w-6 text-blue-600"
          aria-hidden="true"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
        </svg>
      ),
    },
  ];

  const handleSelect = (condition: {
    value: string;
    href?: string;
    icon?: JSX.Element;
  }) => {
    if (selectedCondition === condition.value) {
      setSelectedCondition("");
    } else {
      setSelectedCondition(condition.value);
    }
  };

  const handleGenerate = () => {
    // Logic to generate report based on selected conditions
  };

  const { data: session } = useSession();

  // console.log("session => ", session);

  return (
    <div className="">
      <Header subtitle="Planning Conditions Extractor" />
      <div
        className="relative py-24 px-4 sm:px-8 flex flex-col items-center justify-center text-center"
        style={{
          background:
            "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #0AB2D7 100%)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
          Select Planning Conditions
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 max-w-4xl">
          Choose the planning conditions you want to search for in UK planning
          applications. Our system will find all matching applications with
          detailed information.
        </p>
      </div>

      <div className="">
        <div className="container my-16 mx-auto grid lg:grid-cols-3 gap-8">
          {/* item */}
          {planningConditions.map((condition, index) => {
            const isSelected = selectedCondition === condition.value;

            return (
              <div
                key={index}
                onClick={() => handleSelect(condition)}
                className={cn(
                  "bg-white p-6 rounded-xl shadow-[0px_4px_6px_2px_rgba(0,0,0,0.1)] flex gap-3 items-center",
                  {
                    "border-2 border-blue-500": isSelected,
                  }
                )}
              >
                <div>
                  <div className="bg-blue-100 rounded-lg p-2">
                    {condition?.icon}
                  </div>
                </div>
                <div className="text-xl text-gray-800">{condition.name}</div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mb-12 gap-4">
          <Link
            href={`/report?conditions=${encodeURIComponent(selectedCondition)}`}
          >
            <Button
              variant="defaultBlue"
              className="py-4 h-11"
              disabled={!selectedCondition}
              onClick={handleGenerate}
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
                className="lucide lucide-search mr-1 h-5 w-5"
                aria-hidden="true"
              >
                <path d="m21 21-4.34-4.34"></path>
                <circle cx="11" cy="11" r="8"></circle>
              </svg>
              Generate Report
              {selectedCondition ? ` (${selectedCondition})` : ""}
            </Button>
          </Link>
          <Link href="/custom-report">
            <Button variant="outlineBlue" className=" py-4 h-11">
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
                className="lucide lucide-file-text mr-2 h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
              Custom Report
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
