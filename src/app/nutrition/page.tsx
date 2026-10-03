"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { ChevronLeft, ChevronRight, Plus, Calendar, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { format, subDays, addDays } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Mock data
const MEALS = [
  { id: 1, type: "Breakfast", name: "Oatmeal & Protein Shake", cals: 450, p: 35, c: 55, f: 10, time: "08:30 AM" },
  { id: 2, type: "Lunch", name: "Paneer Butter Masala & Roti", cals: 640, p: 24, c: 64, f: 32, time: "01:15 PM" },
];

const WEEKLY_DATA = [
  { day: "Mon", cals: 2100 },
  { day: "Tue", cals: 1950 },
  { day: "Wed", cals: 2250 },
  { day: "Thu", cals: 1800 },
  { day: "Fri", cals: 2000 },
  { day: "Sat", cals: 2400 },
  { day: "Sun", cals: 1420 }, // Current day
];

export default function NutritionPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevDay = () => setCurrentDate(subDays(currentDate, 1));
  const nextDay = () => setCurrentDate(addDays(currentDate, 1));

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header & Date Navigation */}
      <header className="flex justify-between items-center pt-2">
        <h1 className="text-2xl font-bold">Nutrition</h1>
        <div className="flex items-center space-x-3 bg-secondary/50 rounded-2xl p-1 border border-border">
          <button onClick={prevDay} className="p-2 rounded-xl hover:bg-background text-muted-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium w-24 text-center">
            {format(currentDate, "MMM d, yyyy")}
          </span>
          <button onClick={nextDay} className="p-2 rounded-xl hover:bg-background text-muted-foreground transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Daily Summary */}
      <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-lg">Calories</h3>
              <p className="text-sm text-muted-foreground">780 kcal remaining</p>
            </div>
            <div className="p-2 rounded-xl bg-orange-500/10">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Eaten</p>
              <p className="font-semibold text-xl">1420</p>
            </div>
            <CircularProgress value={1420} max={2200} size={140} strokeWidth={12} color="text-primary">
              <span className="text-3xl font-bold">1420</span>
              <span className="text-xs text-muted-foreground">/ 2200 kcal</span>
            </CircularProgress>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Burned</p>
              <p className="font-semibold text-xl">450</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <MacroSummary label="Protein" current={78} target={120} color="bg-blue-500" />
            <MacroSummary label="Carbs" current={119} target={200} color="bg-orange-500" />
            <MacroSummary label="Fat" current={42} target={70} color="bg-purple-500" />
          </div>
        </CardContent>
      </Card>

      {/* Weekly Chart */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Weekly Overview</h3>
        </div>
        <Card>
          <CardContent className="p-4 pt-6 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--secondary))' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                />
                <Bar dataKey="cals" radius={[4, 4, 0, 0]}>
                  {WEEKLY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === WEEKLY_DATA.length - 1 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* Meals Log */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Today's Meals</h3>
          <button className="text-primary text-sm font-medium flex items-center">
            <Plus className="w-4 h-4 mr-1" /> Add Meal
          </button>
        </div>
        
        <div className="space-y-3">
          {MEALS.map((meal) => (
            <Card key={meal.id} className="overflow-hidden hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">{meal.type}</span>
                    <span className="text-xs text-muted-foreground">{meal.time}</span>
                  </div>
                  <h4 className="font-medium line-clamp-1">{meal.name}</h4>
                  <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-blue-500 mr-1.5" />{meal.p}g P</span>
                    <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-orange-500 mr-1.5" />{meal.c}g C</span>
                    <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-purple-500 mr-1.5" />{meal.f}g F</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <span className="font-bold text-lg">{meal.cals}</span>
                  <span className="text-xs text-muted-foreground block">kcal</span>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Empty slot for dinner/snacks */}
          <button className="w-full flex items-center justify-center space-x-2 p-6 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Log your next meal</span>
          </button>
        </div>
      </section>

      <div className="h-6"></div>
    </div>
  );
}

function MacroSummary({ label, current, target, color }: any) {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline space-x-1 mb-2">
        <span className="font-bold">{current}g</span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
