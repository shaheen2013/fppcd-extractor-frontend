import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div
        className="relative py-24 px-4 sm:px-8 flex flex-col items-center justify-center text-center"
        style={{
          background:
            "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
          Select Planning Conditions
        </h1>
        <p className="text-lg sm:text-xl text-blue-100  max-w-4xl">
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
            className="bg-white p-6 rounded-xl shadow-[0px_4px_6px_2px_rgba(0,0,0,0.1)] flex justify-between"
          >
            <div>icon</div>
            <div>Heritage & Listed Buildings</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
