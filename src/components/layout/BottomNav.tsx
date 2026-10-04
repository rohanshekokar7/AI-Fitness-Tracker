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

export default function BottomNav() {
  const pathname = usePathname();
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  
  // Don't show bottom nav on onboarding
  if (
    pathname.startsWith('/onboarding') || 
    pathname.startsWith('/login') || 
    pathname.startsWith('/signup')
  ) {
    return null;
  }

  return (
    <>
      {/* Floating AI Coach Button - Mobile Only */}
      <button 
        className="md:hidden fixed bottom-24 right-4 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center animate-bounce-slow"
        onClick={() => setIsAICoachOpen(true)}
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* AI Coach Modal */}
      <AICoach isOpen={isAICoachOpen} onClose={() => setIsAICoachOpen(false)} />

      {/* Bottom Navigation - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 w-full bg-card/80 backdrop-blur-lg border-t border-border z-40 pb-safe">
        <div className="flex justify-around items-center h-20 max-w-md mx-auto px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className="flex flex-col items-center justify-center w-full h-full space-y-1 relative group"
              >
                <div className={cn(
                  "p-2 rounded-2xl transition-all duration-300",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground group-hover:text-primary group-hover:bg-primary/5"
                )}>
                  <Icon className={cn(
                    "w-6 h-6 transition-all duration-300",
                    isActive ? "scale-110" : "scale-100"
                  )} />
                </div>
                <span className={cn(
                  "text-[10px] font-medium transition-colors duration-300",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.name}
                </span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
