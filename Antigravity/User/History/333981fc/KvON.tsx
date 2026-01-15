"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/AuthProvider";
import { ArrowRight, Sparkles, FileText, Zap } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="min-h-screen relative">
        {/* Floating Navigation - Clay Style */}
        <nav className="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto">
          <div className="clay-card bg-card/90 px-6 py-3 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-primary text-white shadow-inner">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                MemMart
              </span>
            </Link>
            <div className="flex gap-3">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="clay-button bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold border-none">
                    Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-secondary rounded-xl font-medium">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button className="clay-button bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold border-none">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section - Playful */}
        <div className="relative overflow-hidden pt-36 pb-24">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Badge - Clay */}
              <div className="inline-flex items-center gap-2 mb-10 px-6 py-3 bg-white dark:bg-zinc-800 rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),_inset_-2px_-2px_4px_rgba(255,255,255,0.8)] border border-white/50 group hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                <span className="text-base font-semibold text-foreground/80">AI-Powered Markdown Editor</span>
              </div>

              {/* Title - Playful */}
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1] tracking-tight drop-shadow-sm">
                <span className="text-primary relative inline-block">
                  Write Smarter
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary z-[-1] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                  </svg>
                </span>
                <br />
                <span className="text-foreground">Not Harder</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                MemMart is an intelligent Markdown editor that helps you format, organize, and 
                enhance your content with AI-powered suggestions.
              </p>

              {/* CTA Buttons - Clay */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-24">
                <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                  <Button className="clay-button px-10 py-7 text-xl bg-primary hover:bg-primary/90 text-white h-auto rounded-2xl font-bold border-none transform hover:-translate-y-1 transition-all">
                    {isAuthenticated ? "Open Editor" : "Start Writing"} <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="clay-card px-10 py-7 text-xl border-none bg-white text-foreground hover:bg-white hover:text-primary h-auto rounded-2xl font-bold transform hover:-translate-y-1 transition-all"
                >
                  Learn More
                </Button>
              </div>

              {/* Features Grid - Clay Cards */}
              <div className="grid md:grid-cols-3 gap-8 mt-10">
                <div className="clay-card p-10 group relative overflow-hidden">
                  <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Smart Formatting</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Automatic normalization of Markdown syntax with just one click.
                  </p>
                </div>

                <div className="clay-card p-10 group relative overflow-hidden mt-8 md:mt-0">
                  <div className="bg-secondary/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-10 h-10 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Real-time Preview</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    See your formatted content rendered instantly as you type.
                  </p>
                </div>

                <div className="clay-card p-10 group relative overflow-hidden mt-8 md:mt-8 md:col-start-auto md:row-start-auto">
                  <div className="bg-accent/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">AI Suggestions</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Get AI-powered formatting tips and content improvements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-transparent bg-white/50 backdrop-blur-sm py-12 mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-muted-foreground font-medium">© 2025 MemMart. Built with Next.js, Express, and AI magic.</p>
          </div>
        </div>
      </div>
    </>
  );
}
