"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { account } from "@/lib/appwrite";
import { useAuth } from "@/lib/AuthContext"; // ✅ global auth state
import ThemeToggleButton from "../ui/theme-toggle-button";
import { X } from "lucide-react";
// import { useTheme } from "next-themes";
const Navbar = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const { theme } = useTheme();

  // ✅ Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-background/90 backdrop-blur-md shadow-md"
            : "bg-background/60 backdrop-blur"
        }`}
    >
      {/* ✅ use max-w instead of container */}
      <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="App Logo"
            width={40}
            height={40}
            priority
          />

          <span className="font-semibold text-lg ">
            TrackNest
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#home" className="text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/#about" className="text-sm hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/#contact" className="text-sm hover:text-primary transition-colors">
            Contact
          </Link>
          <button
            onClick={() => {
              if (user) {
                router.push("/dashboard");
              } else {
                router.push("/login");
              }
            }}
            className="text-sm hover:text-primary transition-colors cursor-pointer"
          >
            Dashboard
          </button>
        </nav>
        <div className="hidden md:flex items-center gap-4 cursor-pointer">
          {user ? (
            <Button
              onClick={handleLogout}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button className="rounded-md px-4 py-2 text-sm">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-md px-4 py-2 text-sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <ThemeToggleButton start="top-right" />
        </div>

        {/* Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 items-end p-2"
          >
            {/* top line */}
            <span
              className={`h-0.5 bg-primary rounded transition-all duration-300 ${
                menuOpen ? "w-6 rotate-45 translate-y-2" : "w-8"
              }`}
            />
            {/* middle line */}
            <span
              className={`h-0.5 bg-primary rounded transition-all duration-300 ${
                menuOpen ? "opacity-0" : "w-6"
              }`}
            />
            {/* bottom line */}
            <span
              className={`h-0.5 bg-primary rounded transition-all duration-300 ${
                menuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-60 bg-background/95 backdrop-blur-md shadow-lg transform transition-transform duration-300 z-40
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-400 hover:text-primary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu items */}
        <div className="flex flex-col items-start gap-6 p-6">
          <Link href="/#home" onClick={() => setMenuOpen(false)} className="text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/#about" onClick={() => setMenuOpen(false)} className="text-sm hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/#contact" onClick={() => setMenuOpen(false)} className="text-sm hover:text-primary transition-colors">
            Contact
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              if (user) {
                router.push("/dashboard");
              } else {
                router.push("/login");
              }
            }}
            className="text-sm hover:text-primary transition-colors"
          >
            Dashboard
          </button>
          {user ? (
            <Button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <Button className="w-full rounded-md px-4 py-2 text-sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)}>
                <Button className="w-full rounded-md px-4 py-2 text-sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <ThemeToggleButton start="top-right" />
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
