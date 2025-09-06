"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans transition-colors duration-500">
      {/* ===== Hero Section ===== */}
      <section className="min-h-screen flex items-center transition-colors duration-500">
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Left Side */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
              TrackNest
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-200 drop-shadow-sm">
              Modern Inventory & Store Management System to track products,
              manage stock, and streamline your business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
              <Link
                href="#features"
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
              >
                Explore Features
              </Link>
              <Link
                href="#signup"
                className="border border-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition transform hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/hero-illustration-light.png"
              alt="TrackNest Illustration Light"
              width={450}
              height={450}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 block dark:hidden"
            />
            <Image
              src="/hero-illustration-dark.png"
              alt="TrackNest Illustration Dark"
              width={450}
              height={450}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 hidden dark:block"
            />
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section
        id="features"
        className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
      >
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                title: "Real-time Inventory Tracking",
                desc: "Monitor stock levels instantly and avoid running out of products.",
                icon: "📦",
              },
              {
                title: "Easy Checkout",
                desc: "Quickly process sales with a smooth, user-friendly interface.",
                icon: "🛒",
              },
              {
                title: "User Management",
                desc: "Manage staff access and permissions easily with secure authentication.",
                icon: "👥",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 duration-500 text-left text-gray-800 dark:text-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section
        id="how-it-works"
        className="py-20 transition-colors duration-500"
      >
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                step: "1",
                title: "Add Products",
                desc: "Add your products and their details to the TrackNest system in seconds.",
              },
              {
                step: "2",
                title: "Track Inventory",
                desc: "Monitor real-time stock levels, low-stock alerts, and sales history.",
              },
              {
                step: "3",
                title: "Manage Checkout",
                desc: "Process sales smoothly with integrated checkout and invoice generation.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="space-y-4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:scale-105 duration-500 text-gray-800 dark:text-gray-100"
              >
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
            What Users Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "TrackNest has transformed the way we manage our inventory. It's fast and easy!",
                name: "John Doe, Store Owner",
              },
              {
                quote:
                  "The system is intuitive and saves a lot of time in daily operations.",
                name: "Jane Smith, Manager",
              },
              {
                quote: "Real-time tracking is a game-changer for our business.",
                name: "Alice Johnson, Admin",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 duration-500 text-gray-800 dark:text-gray-100"
              >
                <p className="italic text-sm sm:text-base">{`"${item.quote}"`}</p>
                <h4 className="mt-4 font-semibold text-sm sm:text-base">
                  {item.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <section
        id="signup"
        className="py-20 text-center transition-colors duration-500"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Streamline Your Inventory?
        </h2>
        <p className="mb-6 text-base sm:text-lg">
          Sign up and start managing your products efficiently today!
        </p>
        <Link
          href="/signup"
          className="bg-white text-blue-700 font-semibold px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
