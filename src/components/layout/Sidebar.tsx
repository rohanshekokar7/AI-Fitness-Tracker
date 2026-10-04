/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Utensils, Activity, Dumbbell, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { AICoach } from '@/components/ui/AICoach';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Nutrition', href: '/nutrition', icon: Utensils },
  { name: 'Activity', href: '/activity', icon: Activity },
  { name: 'Workout', href: '/workout', icon: Dumbbell },
  { name: 'Profile', href: '/profile', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  
  if (
    pathname.startsWith('/onboarding') || 
    pathname.startsWith('/login') || 
    pathname.startsWith('/signup')
  ) {
    return null;
  }

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/50 backdrop-blur-md h-screen fixed left-0 top-0 z-40">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
            F
          </div>
          <span className="text-xl font-bold tracking-tight">FitAI</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "scale-110 text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                <span>{item.name}</span>
                {isActive && (
                  <span className="absolute left-0 w-1 h-8 bg-primary rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <button 
            onClick={() => setIsAICoachOpen(true)}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-indigo-500 text-primary-foreground p-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">AI Coach</span>
          </button>
        </div>
      </aside>

      <AICoach isOpen={isAICoachOpen} onClose={() => setIsAICoachOpen(false)} />
    </>
  );
}
