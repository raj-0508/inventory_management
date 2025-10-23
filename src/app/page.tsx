"use client";

import HomeSection from "@/components/home/HomeSection";
import AboutSection from "@/components/about/AboutSection";
import ContactSection from "@/components/contact/ContactSection";
import HowItWorksSection from "@/components/how-it-works/HowItWorksSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans transition-colors duration-500">
      <section id="home">
        <HomeSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="how-it-works">
        <HowItWorksSection />
      </section>
      <section id="what-users-say">
        <TestimonialsSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </div>
  );
}
