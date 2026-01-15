"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/components/providers/AuthProvider";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { FileText, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSuccess = async (response: any) => {
    setError("");
    setIsLoading(true);

    try {
      const idToken = response.credential;
      
      // Sync with backend and auth context
      await login(idToken);

      // Redirect to dashboard or intended path
      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/dashboard";
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(redirectPath);
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      setError(err.message || "Google sign-in failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleError = () => {
    setError("Google Sign-In failed. Please try again.");
    setIsLoading(false);
  };

  return (
    <>
      <AnimatedBackground />
      <AnimatedBackground />
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        {/* Back to Home Button - Clay Style */}
        <Link 
          href="/" 
          className="absolute top-8 left-8 text-foreground/70 hover:text-foreground transition-colors duration-200 flex items-center gap-2 group cursor-pointer"
        >
          <div className="p-3 rounded-full bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-base font-medium">Back to Home</span>
        </Link>

        {/* Login Card - Claymorphism */}
        <div className="relative z-10 w-full max-w-md">
          <div className="clay-card p-10 relative overflow-hidden">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-inner">
                  <FileText className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-black text-foreground mb-3 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-lg">Sign in to MemMart</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border-none rounded-2xl text-red-600 text-sm flex items-center gap-3 shadow-sm">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </div>
            )}

            {/* Google Sign-In Button */}
            <div className="space-y-8">
              {/* Loading state overlay */}
              {isLoading && (
                <div className="flex items-center justify-center gap-3 py-6">
                  <div className="w-6 h-6 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
                  <span className="text-muted-foreground font-medium">Signing in...</span>
                </div>
              )}
              
              {!isLoading && (
                <div className="flex justify-center w-full">
                  <div className="w-full transform transition-transform hover:-translate-y-1">
                     <GoogleLogin
                      onSuccess={handleSuccess}
                      onError={handleError}
                      theme="filled_blue" /* Closer to clay than outline */
                      size="large"
                      shape="pill" /* Pill shape is more round/playful */
                      width="100%"
                      logo_alignment="center"
                      text="continue_with"
                      useOneTap={false}
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
                  <span className="bg-card px-4 text-muted-foreground">
                    Secure Authentication
                  </span>
                </div>
              </div>

              {/* Info */}
              <p className="text-center text-sm text-muted-foreground leading-relaxed">
                By continuing, you agree to MemMart's <Link href="#" className="text-primary hover:underline transition-all">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline transition-all">Privacy Policy</Link>.
              </p>
            </div>
          </div>
          
           {/* Footer Text */}
           <div className="text-center mt-10 space-y-2">
            <p className="text-muted-foreground text-sm font-medium">
              New here? <Link href="/login" className="text-primary hover:text-primary/80 font-bold transition-colors">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
