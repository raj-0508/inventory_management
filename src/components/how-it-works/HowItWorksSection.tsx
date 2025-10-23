"use client";

import { CardHoverEffect } from "@/components/ui/pulse-card";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      title: "Find products fast",
      desc: "Search by name or SKU and filter by category or stock level to locate items instantly.",
    },
    {
      step: "2",
      title: "Add new stock",
      desc: "Create products with name, SKU, price, and starting quantity—optimized for speed.",
    },
    {
      step: "3",
      title: "Adjust in real time",
      desc: "Increase or decrease quantities during restocks and audits. Every change is immediate.",
    },
    {
      step: "4",
      title: "Keep your catalog clean",
      desc: "Remove discontinued items and avoid duplicates so your inventory stays accurate.",
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
