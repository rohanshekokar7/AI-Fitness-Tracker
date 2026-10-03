"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const goals = [
  "Lose weight",
  "Gain muscle",
  "Maintain weight",
  "Improve fitness",
  "Improve endurance"
];

const activityLevels = [
  { id: "sedentary", label: "Sedentary", desc: "Little or no exercise" },
  { id: "light", label: "Lightly active", desc: "Light exercise/sports 1-3 days/week" },
  { id: "moderate", label: "Moderately active", desc: "Moderate exercise 3-5 days/week" },
  { id: "active", label: "Very active", desc: "Hard exercise 6-7 days/week" }
];

const diets = ["Vegetarian", "Vegan", "Eggetarian", "Non-vegetarian"];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    targetWeight: "",
    activityLevel: "",
    goal: "",
    diet: ""
  });
  
  const [results, setResults] = useState<any>(null);

  const updateData = (key: string, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const calculateMetrics = () => {
    // Simple calculations for demo
    const weight = parseFloat(data.weight);
    const height = parseFloat(data.height) / 100;
    const age = parseInt(data.age);
    
    // BMI
    const bmi = weight / (height * height);
    
    // BMR (Mifflin-St Jeor Equation)
    let bmr = 10 * weight + 6.25 * (height * 100) - 5 * age;
    bmr += data.gender === "male" ? 5 : -161;
    
    // TDEE
    const multipliers: any = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725
    };
    const tdee = bmr * (multipliers[data.activityLevel] || 1.2);
    
    // Target Calories
    let targetCals = tdee;
    if (data.goal === "Lose weight") targetCals -= 500;
    if (data.goal === "Gain muscle") targetCals += 300;
    
    // Macros (example distribution)
    const protein = (weight * 2.2); // ~2.2g per kg
    const fat = (targetCals * 0.25) / 9; // 25% from fat
    const carbs = (targetCals - (protein * 4) - (fat * 9)) / 4;
    
    setResults({
      bmi: bmi.toFixed(1),
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: Math.round(targetCals),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat)
    });
    
    setStep(6);
  };

  const nextStep = () => {
    if (step === 5) {
      calculateMetrics();
    } else if (step < 6) {
      setStep(step + 1);
    } else {
      router.push("/");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepContainer title="Welcome to FitAI" subtitle="Let's personalize your experience">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">What's your name?</label>
                <input 
                  type="text" 
                  value={data.name}
                  onChange={(e) => updateData("name", e.target.value)}
                  className="w-full p-4 rounded-2xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Age</label>
                  <input 
                    type="number" 
                    value={data.age}
                    onChange={(e) => updateData("age", e.target.value)}
                    className="w-full p-4 rounded-2xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Years"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Biological Sex</label>
                  <select 
                    value={data.gender}
                    onChange={(e) => updateData("gender", e.target.value)}
                    className="w-full p-4 rounded-2xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                  >
                    <option value="" disabled>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer title="Your Body Metrics" subtitle="Used to calculate your basal metabolic rate">
             <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Height (cm)</label>
                <input 
                  type="number" 
                  value={data.height}
                  onChange={(e) => updateData("height", e.target.value)}
                  className="w-full p-4 rounded-2xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. 175"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Current Weight (kg)</label>
                <input 
                  type="number" 
                  value={data.weight}
                  onChange={(e) => updateData("weight", e.target.value)}
                  className="w-full p-4 rounded-2xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. 70"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Target Weight (kg)</label>
                <input 
                  type="number" 
                  value={data.targetWeight}
                  onChange={(e) => updateData("targetWeight", e.target.value)}
                  className="w-full p-4 rounded-2xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. 65"
                />
              </div>
            </div>
          </StepContainer>
        );
      case 3:
        return (
          <StepContainer title="What's your primary goal?" subtitle="We'll tailor your plan to achieve this">
            <div className="space-y-3">
              {goals.map(g => (
                <button
                  key={g}
                  onClick={() => updateData("goal", g)}
                  className={cn(
                    "w-full p-4 rounded-2xl border text-left flex justify-between items-center transition-all",
                    data.goal === g ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:bg-secondary/50"
                  )}
                >
                  <span className="font-medium">{g}</span>
                  {data.goal === g && <Check className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </StepContainer>
        );
      case 4:
        return (
          <StepContainer title="Activity Level" subtitle="How active are you in your daily life?">
            <div className="space-y-3">
              {activityLevels.map(a => (
                <button
                  key={a.id}
                  onClick={() => updateData("activityLevel", a.id)}
                  className={cn(
                    "w-full p-4 rounded-2xl border text-left transition-all",
                    data.activityLevel === a.id ? "border-primary bg-primary/10" : "border-border bg-card hover:bg-secondary/50"
                  )}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn("font-semibold", data.activityLevel === a.id ? "text-primary" : "")}>{a.label}</span>
                    {data.activityLevel === a.id && <Check className="w-5 h-5 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </button>
              ))}
            </div>
          </StepContainer>
        );
      case 5:
        return (
          <StepContainer title="Dietary Preferences" subtitle="Any specific diet you follow?">
            <div className="space-y-3">
              {diets.map(d => (
                <button
                  key={d}
                  onClick={() => updateData("diet", d)}
                  className={cn(
                    "w-full p-4 rounded-2xl border text-left flex justify-between items-center transition-all",
                    data.diet === d ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:bg-secondary/50"
                  )}
                >
                  <span className="font-medium">{d}</span>
                  {data.diet === d && <Check className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </StepContainer>
        );
      case 6:
        return (
          <StepContainer title="Your AI Plan is Ready" subtitle="Based on your profile, here are your targets">
            {results && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/50 rounded-2xl border border-border text-center">
                    <div className="text-sm text-muted-foreground mb-1">Target Calories</div>
                    <div className="text-2xl font-bold text-primary">{results.calories} <span className="text-sm font-normal text-muted-foreground">kcal</span></div>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-2xl border border-border text-center">
                    <div className="text-sm text-muted-foreground mb-1">BMI</div>
                    <div className="text-2xl font-bold">{results.bmi}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Daily Macros Target</h3>
                  <div className="space-y-3">
                    <MacroBar label="Protein" value={results.protein} total={results.protein + results.carbs + results.fat} color="bg-blue-500" />
                    <MacroBar label="Carbs" value={results.carbs} total={results.protein + results.carbs + results.fat} color="bg-orange-500" />
                    <MacroBar label="Fat" value={results.fat} total={results.protein + results.carbs + results.fat} color="bg-purple-500" />
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20">
                  <h4 className="font-medium text-primary mb-2 flex items-center">
                    <SparklesIcon className="w-4 h-4 mr-2" /> AI Coach Note
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I've calculated these targets to help you safely achieve your goal of {data.goal.toLowerCase()}. You can adjust these anytime in your settings.
                  </p>
                </div>
              </div>
            )}
          </StepContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-secondary">
        <div 
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${(step / 6) * 100}%` }}
        />
      </div>
      
      {/* Top Nav */}
      <div className="px-4 py-4 flex items-center">
        {step > 1 && step < 6 && (
          <button 
            onClick={() => setStep(step - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-24 overflow-y-auto no-scrollbar md:max-w-2xl md:mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 w-full p-6 bg-gradient-to-t from-background via-background to-transparent md:max-w-2xl md:left-1/2 md:-translate-x-1/2">
        <button
          onClick={nextStep}
          className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center"
        >
          {step === 6 ? "Get Started" : "Continue"}
          {step !== 6 && <ChevronRight className="w-5 h-5 ml-1" />}
        </button>
      </div>
    </div>
  );
}

function StepContainer({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) {
  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-8">{subtitle}</p>
      {children}
    </div>
  );
}

function MacroBar({ label, value, total, color }: any) {
  const percentage = Math.round((value / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}g <span className="text-muted-foreground font-normal">({percentage}%)</span></span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}
