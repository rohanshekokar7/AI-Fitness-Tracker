"use client";

import { CircularProgress } from "@/components/ui/CircularProgress";
import { Card, CardContent } from "@/components/ui/Card";
import { Activity, Flame, Droplets, Moon, Dumbbell, Camera, Plus, Zap, Trophy, TrendingUp, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  // Mock data for Phase 1 MVP
  const user = { name: "Alex" };
  const score = 82;
  const metrics = {
    calories: { current: 1420, max: 2200, unit: "kcal", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    protein: { current: 78, max: 120, unit: "g", icon: Zap, color: "text-blue-500", bg: "bg-blue-500/10" },
    steps: { current: 6842, max: 10000, unit: "", icon: Activity, color: "text-green-500", bg: "bg-green-500/10" },
    water: { current: 1.8, max: 3.0, unit: "L", icon: Droplets, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    sleep: { current: "7h 32m", max: "8h", unit: "", icon: Moon, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    workout: { current: "Completed", max: "", unit: "", icon: Dumbbell, color: "text-purple-500", bg: "bg-purple-500/10" },
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center pt-2">
        <div>
          <h2 className="text-sm text-muted-foreground font-medium">Good morning,</h2>
          <h1 className="text-2xl font-bold">{user.name}</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-border">
          <UserIcon />
        </div>
      </header>

      {/* Daily Score & AI Insight */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20 lg:col-span-1">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Daily Score</h3>
              <p className="text-sm text-muted-foreground mb-4">You're doing great!</p>
              <div className="flex items-center space-x-2 text-sm font-medium text-success">
                <TrendingUp className="w-4 h-4" />
                <span>+5 from yesterday</span>
              </div>
            </div>
            <CircularProgress value={score} max={100} size={100} strokeWidth={8} color="text-primary">
              <span className="text-2xl font-bold">{score}</span>
              <span className="text-[10px] text-muted-foreground">/100</span>
            </CircularProgress>
          </CardContent>
        </Card>

        {/* AI Insight */}
        <Card className="lg:col-span-2">
          <CardContent className="p-4 flex gap-4 items-start h-full">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
              <SparklesIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1 flex items-center">
                AI Insight
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your activity level was strong today, but protein intake is slightly below target. Consider adding ~20g of protein to your next meal.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickAction icon={Camera} label="Scan Food" href="/scan" color="bg-orange-500" />
          <QuickAction icon={Plus} label="Log Food" href="/log" color="bg-blue-500" />
          <QuickAction icon={Dumbbell} label="Workout" href="/workout" color="bg-purple-500" />
          <QuickAction icon={Droplets} label="Water" href="/water" color="bg-cyan-500" />
        </div>
      </section>

      {/* Core Metrics */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Today's Progress</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard 
            title="Calories" 
            current={metrics.calories.current} 
            max={metrics.calories.max} 
            unit={metrics.calories.unit}
            icon={metrics.calories.icon}
            color={metrics.calories.color}
            bg={metrics.calories.bg}
          />
          <MetricCard 
            title="Protein" 
            current={metrics.protein.current} 
            max={metrics.protein.max} 
            unit={metrics.protein.unit}
            icon={metrics.protein.icon}
            color={metrics.protein.color}
            bg={metrics.protein.bg}
          />
          <MetricCard 
            title="Steps" 
            current={metrics.steps.current} 
            max={metrics.steps.max} 
            unit={metrics.steps.unit}
            icon={metrics.steps.icon}
            color={metrics.steps.color}
            bg={metrics.steps.bg}
          />
          <MetricCard 
            title="Water" 
            current={metrics.water.current} 
            max={metrics.water.max} 
            unit={metrics.water.unit}
            icon={metrics.water.icon}
            color={metrics.water.color}
            bg={metrics.water.bg}
          />
        </div>
      </section>

      {/* Bottom padding for floating AI button & nav */}
      <div className="h-6"></div>
    </div>
  );
}

function MetricCard({ title, current, max, unit, icon: Icon, color, bg }: any) {
  const percentage = max ? Math.min((current / max) * 100, 100) : 0;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className={`p-2 rounded-xl ${bg}`}>
            <Icon className={`w-4 h-4 ${color}`} />
          </div>
        </div>
        <p className="text-xs text-muted-foreground font-medium mb-1">{title}</p>
        <div className="flex items-baseline space-x-1">
          <span className="text-lg font-bold">{current}</span>
          <span className="text-xs text-muted-foreground">/ {max} {unit}</span>
        </div>
        {max && (
          <div className="w-full bg-secondary h-1.5 rounded-full mt-3 overflow-hidden">
            <motion.div 
              className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function QuickAction({ icon: Icon, label, href, color }: any) {
  return (
    <Link href={href} className="flex flex-col items-center space-y-2 group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 active:scale-95 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-[10px] font-medium text-center">{label}</span>
    </Link>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
