import Link from "next/link";

export default function Header() {
  return (
    <div
      className="mx-auto px-6 py-8"
      style={{
        background:
          "linear-gradient(135deg, #1e40af 0%, #3b82f6 40%, #06b6d4 100%)",
      }}
    >
      <div className="flex items-center justify-between container mx-auto">
        {/* Left Section */}
        <div>
          <h1
            className="text-5xl font-semibold text-white mb-2"
            style={{
              textShadow:
                "0 4px 24px rgba(30,64,175,0.7), 0 2px 8px rgba(0,0,0,0.6), 0 1px 1px rgba(0,0,0,0.3)",
            }}
          >
            FPPCD
          </h1>
          <p className="text-blue-100 text-lg">Planning Conditions Extractor</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <span className="text-blue-100">
            Welcome, <span className="text-white font-medium">Mark S</span>
          </span>
          <Link
            href="/login"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/50"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
