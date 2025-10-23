"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="relative mt-16 border-t border-border/60 bg-gradient-to-b from-transparent to-blue-50/40 dark:to-blue-950/10">
      <div className="absolute inset-x-0 -top-6 mx-auto h-6 max-w-7xl bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-500/10 blur-2xl" />

      <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-lg font-semibold">TrackNest</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Smart inventory tracking for modern teams. Stay organized, in sync, and in control.
            </p>
            <div className="flex items-center gap-3 pt-2 text-muted-foreground">
              <Link href="#" aria-label="Twitter" className="hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="GitHub" className="hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="mailto:hello@tracknest.app" aria-label="Email" className="hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-2 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold tracking-wide text-foreground">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/#home" className="hover:text-blue-600 transition-colors">Home</Link></li>
                <li><Link href="/#about" className="hover:text-blue-600 transition-colors">About</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-blue-600 transition-colors">How it works</Link></li>
                <li><Link href="/#what-users-say" className="hover:text-blue-600 transition-colors">Testimonials</Link></li>
                <li><Link href="/#contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold tracking-wide text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/login" className="hover:text-blue-600 transition-colors">Login</Link></li>
                <li><Link href="/signup" className="hover:text-blue-600 transition-colors">Sign up</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Terms</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold tracking-wide text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Docs</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Guides</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">API Status</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wide text-foreground">Stay in the loop</h4>
            <p className="text-sm text-muted-foreground">Get product updates and tips. No spam, unsubscribe any time.</p>
            <form onSubmit={handleSubscribe} className="flex w-full gap-2">
              <Input type="email" placeholder="Your email" required className="bg-background" />
              <Button className="bg-gradient-to-b from-blue-500 to-blue-700 text-white">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} TrackNest. All rights reserved.</p>
          <p className="text-center sm:text-right">Built with ❤️ by Raj Singhaniya</p>
        </div>
      </div>
    </footer>
  );
}


