/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, User, FileText, Dumbbell, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const QUICK_PROMPTS = [
  "What should I eat?",
  "Create today's workout",
  "Analyze my progress",
  "How much protein do I need?"
];

export function AICoach({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "Hi! I'm your FitAI coach. How can I help you reach your goals today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "I analyzed your data. You're doing great! Keep it up.";
      
      if (text.toLowerCase().includes("eat")) {
        aiResponse = "Based on your remaining macros (42g protein, 81g carbs, 28g fat), I recommend a grilled chicken salad with quinoa or paneer tikka with veggies.";
      } else if (text.toLowerCase().includes("workout")) {
        aiResponse = "Since you did Lower Body yesterday, let's focus on Upper Body Power today. It will take about 45 minutes.";
      } else if (text.toLowerCase().includes("progress")) {
        aiResponse = "You've hit your protein target 4 out of 7 days this week and stayed within your calorie limit. Your daily score is 82/100!";
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 md:left-auto md:right-8 md:bottom-28 h-[85vh] md:h-[600px] md:w-[400px] bg-background md:rounded-3xl rounded-t-3xl shadow-2xl z-[101] flex flex-col border md:border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
              <div className="flex items-center space-x-2 text-primary">
                <Sparkles className="w-5 h-5" />
                <h2 className="font-semibold text-lg">AI Coach</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "max-w-[85%] rounded-2xl p-4 flex flex-col",
                  msg.role === 'ai' 
                    ? "bg-secondary/50 text-foreground self-start rounded-tl-sm border border-border" 
                    : "bg-primary text-primary-foreground self-end rounded-tr-sm shadow-sm"
                )}>
                  <div className="flex items-center space-x-2 mb-1.5 opacity-80">
                    {msg.role === 'ai' ? <Sparkles className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    <span className="text-xs font-medium uppercase tracking-wider">{msg.role === 'ai' ? 'FitAI' : 'You'}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              ))}
              
              {messages.length === 1 && (
                <div className="pt-4 grid grid-cols-1 gap-2">
                  <p className="text-xs text-center text-muted-foreground mb-2">Try asking:</p>
                  {QUICK_PROMPTS.map(prompt => (
                    <button 
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="text-sm text-left p-3 rounded-xl bg-secondary/30 hover:bg-secondary border border-border transition-colors text-foreground"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border pb-safe">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Ask your AI coach..."
                  className="w-full bg-secondary/50 border border-border rounded-full pl-5 pr-12 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
                <button 
                  onClick={() => handleSend(input)}
                  disabled={!input.trim()}
                  className="absolute right-2 p-2.5 rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:bg-secondary disabled:text-muted-foreground transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
