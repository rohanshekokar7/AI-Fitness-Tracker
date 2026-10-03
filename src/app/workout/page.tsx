"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Dumbbell, Play, Timer, ArrowRight, Sparkles, Plus, CheckCircle2 } from "lucide-react";

export default function WorkoutPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <header className="pt-2">
        <h1 className="text-2xl font-bold">Workout</h1>
      </header>

      {/* AI Coach Banner */}
      <Card className="bg-primary text-primary-foreground border-none overflow-hidden relative">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between">
            <div className="w-3/4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
                <h3 className="font-semibold">AI Generated Plan</h3>
              </div>
              <p className="text-sm opacity-90 mb-4">Based on your goal to gain muscle, here's your optimal workout for today.</p>
              <button className="bg-background text-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-background/90 transition-colors inline-flex items-center">
                Start Workout <Play className="w-4 h-4 ml-2 fill-current" />
              </button>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Dumbbell className="w-6 h-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Plan Preview */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Upper Body Power</h3>
          <span className="text-sm text-muted-foreground flex items-center"><Timer className="w-4 h-4 mr-1" /> 45 min</span>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              <ExerciseRow name="Dumbbell Bench Press" sets="3" reps="10" />
              <ExerciseRow name="Shoulder Press" sets="3" reps="10" />
              <ExerciseRow name="Lat Pulldown" sets="3" reps="12" />
              <ExerciseRow name="Bicep Curl" sets="3" reps="12" />
              <ExerciseRow name="Tricep Extension" sets="3" reps="12" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Categories */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Categories</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <CategoryCard title="Strength" count={12} color="bg-orange-500" />
          <CategoryCard title="Cardio" count={8} color="bg-blue-500" />
          <CategoryCard title="HIIT" count={5} color="bg-purple-500" />
          <CategoryCard title="Yoga" count={10} color="bg-green-500" />
        </div>
      </section>

      {/* History */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Recent History</h3>
        </div>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-medium">Lower Body Strength</h4>
                <p className="text-xs text-muted-foreground">Yesterday • 52 min</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </CardContent>
        </Card>
      </section>

      <div className="h-6"></div>
    </div>
  );
}

function ExerciseRow({ name, sets, reps }: { name: string, sets: string, reps: string }) {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
          <Dumbbell className="w-4 h-4" />
        </div>
        <span className="font-medium">{name}</span>
      </div>
      <div className="text-sm font-medium text-muted-foreground">
        {sets} x {reps}
      </div>
    </div>
  );
}

function CategoryCard({ title, count, color }: any) {
  return (
    <Card className="hover:border-primary/50 transition-colors cursor-pointer group overflow-hidden">
      <CardContent className="p-4 relative">
        <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 ${color}`}></div>
        <h4 className="font-semibold mb-1 relative z-10">{title}</h4>
        <p className="text-xs text-muted-foreground relative z-10">{count} workouts</p>
      </CardContent>
    </Card>
  );
}
