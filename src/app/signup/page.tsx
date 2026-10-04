"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";

type SignupStep = "EMAIL" | "OTP" | "PASSWORD";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<SignupStep>("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setNotification("Simulated email sent! Use 123456 to verify.");
      setStep("OTP");
      
      // Clear notification after 5 seconds
      setTimeout(() => setNotification(""), 5000);
    }, 1500);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      if (otp === "123456") {
        setStep("PASSWORD");
      } else {
        setNotification("Invalid OTP. Please use 123456.");
        setTimeout(() => setNotification(""), 3000);
      }
    }, 1000);
  };

  const handleCompleteSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-6 md:max-w-md md:mx-auto relative">
      
      {/* Toast Notification for Simulation */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-8 left-6 right-6 bg-primary text-primary-foreground px-4 py-3 rounded-xl shadow-lg flex items-center space-x-2 text-sm font-medium z-50"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-3xl mx-auto mb-6 shadow-lg shadow-primary/30">
            F
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create Account</h1>
          <p className="text-muted-foreground">
            {step === "EMAIL" && "Enter your email to get started"}
            {step === "OTP" && "We sent a code to your email"}
            {step === "PASSWORD" && "Secure your account"}
          </p>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: EMAIL */}
            {step === "EMAIL" && (
              <motion.form 
                key="EMAIL"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSendOTP} 
                className="space-y-4"
              >
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      required
                      className="w-full bg-secondary/50 border border-border rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center mt-8 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </motion.form>
            )}

            {/* STEP 2: OTP */}
            {step === "OTP" && (
              <motion.form 
                key="OTP"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleVerifyOTP} 
                className="space-y-4"
              >
                <div className="text-sm font-medium text-center mb-6 text-foreground bg-secondary/50 p-3 rounded-xl border border-border/50">
                  Code sent to <span className="text-primary">{email}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input 
                      type="text" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      required
                      className="w-full bg-secondary/50 border border-border rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono tracking-widest text-center"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center mt-8 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Verify OTP
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
                
                <div className="text-center mt-4">
                  <button 
                    type="button" 
                    onClick={() => setStep("EMAIL")}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Change email address
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 3: PASSWORD */}
            {step === "PASSWORD" && (
              <motion.form 
                key="PASSWORD"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleCompleteSignup} 
                className="space-y-4"
              >
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      required
                      minLength={8}
                      className="w-full bg-secondary/50 border border-border rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground px-2">Must be at least 8 characters long</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || password.length < 8}
                  className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center mt-8 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Complete Sign Up
                      <CheckCircle2 className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
            
          </AnimatePresence>
        </div>

        {step === "EMAIL" && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
