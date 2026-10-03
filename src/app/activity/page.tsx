"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { Footprints, Map, Timer, Flame, Trophy, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const HOURLY_STEPS = [
  { time: "6am", steps: 0 },
  { time: "9am", steps: 1200 },
  { time: "12pm", steps: 3500 },
  { time: "3pm", steps: 2100 },
  { time: "6pm", steps: 50 },
  { time: "9pm", steps: 0 },
];

export default function ActivityPage() {
  const steps = 6842;
  const stepGoal = 10000;
  
  return (
    <div className="p-4 md:p-6 space-y-6">
      <header className="pt-2">
        <h1 className="text-2xl font-bold">Activity</h1>
      </header>

      {/* Main Step Ring */}
      <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <CircularProgress value={steps} max={stepGoal} size={200} strokeWidth={16} color="text-green-500">
              <Footprints className="w-8 h-8 text-green-500 mb-2 opacity-80" />
              <span className="text-4xl font-bold tracking-tight">{steps.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground mt-1">/ {stepGoal.toLocaleString()} steps</span>
            </CircularProgress>
            
            <div className="mt-6 flex items-center space-x-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-500/10 px-4 py-2 rounded-full">
              <Trophy className="w-4 h-4" />
              <span>3,158 steps to reach your goal!</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Map} label="Distance" value="5.2" unit="km" color="text-blue-500" bg="bg-blue-500/10" />
        <StatCard icon={Flame} label="Calories" value="320" unit="kcal" color="text-orange-500" bg="bg-orange-500/10" />
        <StatCard icon={Timer} label="Active" value="45" unit="min" color="text-purple-500" bg="bg-purple-500/10" />
        <StatCard icon={TrendingUp} label="Floors" value="12" unit="fl" color="text-cyan-500" bg="bg-cyan-500/10" />
      </div>

      {/* Chart */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Today's Activity</h3>
        </div>
        <Card>
          <CardContent className="p-0 h-48 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_STEPS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                />
                <Area type="monotone" dataKey="steps" stroke="hsl(142 71% 45%)" strokeWidth={3} fillOpacity={1} fill="url(#colorSteps)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* Data Source */}
      <div className="p-4 rounded-2xl bg-secondary text-sm flex items-center justify-between text-muted-foreground border border-border">
        <span>Data source: Mocked Data</span>
        <button className="text-primary font-medium hover:underline">Connect Watch</button>
      </div>

      <div className="h-6"></div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, unit, color, bg }: any) {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-xl ${bg}`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-xl font-bold">{value} <span className="text-sm font-normal text-muted-foreground">{unit}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}
