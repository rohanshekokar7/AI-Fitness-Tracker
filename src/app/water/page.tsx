"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { Droplets, ChevronLeft, Plus, History } from "lucide-react";
import { motion } from "framer-motion";

export default function WaterPage() {
  const router = useRouter();
  const [water, setWater] = useState(1.8);
  const goal = 3.0;

  const addWater = (amount: number) => {
    setWater(prev => Math.min(prev + amount, 5.0)); // Cap at 5L for demo
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md px-4 h-16 flex items-center justify-between">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold">Hydration</h1>
        <button className="p-2 -mr-2 text-muted-foreground hover:text-foreground">
          <History className="w-5 h-5" />
        </button>
      </header>

      <div className="p-4 space-y-8">
        {/* Main Display */}
        <div className="flex flex-col items-center pt-8">
          <div className="relative">
            {/* Background glowing effect */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-150" />
            
            <CircularProgress value={water} max={goal} size={240} strokeWidth={16} color="text-cyan-500">
              <Droplets className="w-10 h-10 text-cyan-500 mb-2 opacity-80" />
              <div className="flex items-baseline space-x-1">
                <span className="text-5xl font-bold tracking-tight">{water.toFixed(1)}</span>
                <span className="text-xl text-muted-foreground font-medium">L</span>
              </div>
              <span className="text-sm text-muted-foreground mt-2">/ {goal.toFixed(1)} L Goal</span>
            </CircularProgress>
          </div>
          
          <p className="mt-8 text-center text-muted-foreground font-medium">
            {water >= goal ? "Daily goal reached! Great job! 🎉" : `${(goal - water).toFixed(1)}L to go! Keep hydrating.`}
          </p>
        </div>

        {/* Quick Add Buttons */}
        <section>
          <h3 className="font-semibold mb-4 text-center">Quick Add</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AddWaterButton amount={0.25} label="250 ml" onClick={() => addWater(0.25)} />
            <AddWaterButton amount={0.5} label="500 ml" onClick={() => addWater(0.5)} />
            <AddWaterButton amount={0.75} label="750 ml" onClick={() => addWater(0.75)} />
            <AddWaterButton amount={1.0} label="1 L" onClick={() => addWater(1.0)} />
          </div>
        </section>

      </div>
    </div>
  );
}

function AddWaterButton({ amount, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="bg-secondary hover:bg-secondary/80 border border-border flex flex-col items-center justify-center p-6 rounded-3xl transition-all active:scale-95 group relative overflow-hidden"
    >
      <div className="absolute inset-x-0 bottom-0 bg-cyan-500/10 transition-all duration-500 group-hover:h-full h-0" />
      <Plus className="w-6 h-6 text-cyan-500 mb-2 relative z-10" />
      <span className="font-semibold relative z-10">{label}</span>
    </button>
  );
}
