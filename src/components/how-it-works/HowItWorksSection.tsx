"use client";

import { CardHoverEffect } from "@/components/ui/pulse-card";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      title: "Sign Up & Login",
      desc: "Create your account with secure authentication powered by Appwrite. Your data is isolated and protected.",
    },
    {
      step: "2",
      title: "Add Your Products",
      desc: "Create inventory items with name, SKU, quantity, and price. Start building your product catalog instantly.",
    },
    {
      step: "3",
      title: "Track & Manage",
      desc: "Search products by name or SKU, sort by any field, and update quantities in real-time. Get instant low-stock alerts.",
    },
    {
      step: "4",
      title: "Sell & Invoice",
      desc: "Process sales with customer details, generate professional invoices, and automatically update inventory levels.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/30 dark:from-background dark:to-[#0b1220]/40 transition-colors duration-500 scroll-mt-24">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {steps.map((item, idx) => (
            <CardHoverEffect
              key={item.title}
              icon={<span className="text-blue-600 dark:text-blue-400 text-xl font-bold">{item.step}</span>}
              title={item.title}
              description={item.desc}
              variant={idx % 2 === 0 ? "blue" : "purple"}
              glowEffect={true}
              size="lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
