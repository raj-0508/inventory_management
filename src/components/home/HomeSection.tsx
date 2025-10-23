"use client";

import Link from "next/link";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight";

export default function HomeSection() {
  return (
    <div className="font-sans transition-colors duration-500">
      {/* ===== Hero Section ===== */}
      <section className="relative min-h-screen flex items-center transition-colors duration-500 scroll-mt-24">
        <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(59,130,246,0.10) 0, rgba(59,130,246,0.05) 50%, rgba(59,130,246,0) 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(37,99,235,0.10) 0, rgba(37,99,235,0.05) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, rgba(14,165,233,0.06) 0, rgba(14,165,233,0.06) 80%, transparent 100%)"
        />
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Left Side */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
              Inventory, always accurate
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground drop-shadow-sm">
              Track products, control stock, and update quantities in real time. Replace spreadsheets with a fast, reliable ERP built for modern stores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
              <Link href="#about" className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-blue-600/90 transition transform hover:scale-105 shadow-lg border border-transparent">See how it works</Link>
              <Link href="/signup" className="border border-primary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition transform hover:scale-105 shadow-lg">Get started</Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/dashboardimg.png"
              alt="TrackNest Illustration Light"
              width={450}
              height={450}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 block dark:hidden"
            />
            <Image
              src="/dashboardimg.png"
              alt="TrackNest Illustration Dark"
              width={450}
              height={450}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 hidden dark:block"
            />
          </div>
        </div>
      </section>

      {/* Other sections are composed in page.tsx */}
    </div>
  );
}


