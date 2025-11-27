import Link from "next/link";

export default function Home() {
  return (
    <div className="">
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
        <div className="container my-16 mx-auto grid grid-cols-2 gap-8">
          {/* item */}
          <Link
            href="/report?data=1"
            className="bg-white p-6 rounded-xl shadow-[0px_4px_6px_2px_rgba(0,0,0,0.1)] flex gap-3 items-center"
          >
            <div>
              <div className="bg-blue-100 rounded-lg p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
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
              </div>
            </div>
            <div className="text-xl text-gray-800">
              Heritage & Listed Buildings
            </div>
          </Link>

          <Link
            href="/report?data=1"
            className="bg-white p-6 rounded-xl shadow-[0px_4px_6px_2px_rgba(0,0,0,0.1)] flex gap-3 items-center"
          >
            <div>
              <div className="bg-blue-100 rounded-lg p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
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
              </div>
            </div>
            <div className="text-xl text-gray-800">
              Heritage & Listed Buildings
            </div>
          </Link>

          <Link
            href="/report?data=1"
            className="bg-white p-6 rounded-xl shadow-[0px_4px_6px_2px_rgba(0,0,0,0.1)] flex gap-3 items-center"
          >
            <div>
              <div className="bg-blue-100 rounded-lg p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
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
              </div>
            </div>
            <div className="text-xl text-gray-800">
              Heritage & Listed Buildings
            </div>
          </Link>

          <Link
            href="/report?data=1"
            className="bg-white p-6 rounded-xl shadow-[0px_4px_6px_2px_rgba(0,0,0,0.1)] flex gap-3 items-center"
          >
            <div>
              <div className="bg-blue-100 rounded-lg p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
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
              </div>
            </div>
            <div className="text-xl text-gray-800">
              Heritage & Listed Buildings
            </div>
          </Link>

          <Link
            href="/report?data=1"
            className="bg-white p-6 rounded-xl shadow-[0px_4px_6px_2px_rgba(0,0,0,0.1)] flex gap-3 items-center"
          >
            <div>
              <div className="bg-blue-100 rounded-lg p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
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
              </div>
            </div>
            <div className="text-xl text-gray-800">
              Heritage & Listed Buildings
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
