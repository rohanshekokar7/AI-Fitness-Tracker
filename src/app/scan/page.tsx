"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, Image as ImageIcon, X, ChevronLeft, Sparkles, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";

// Mock AI analysis result
const MOCK_AI_RESULT = {
  items: [
    { id: 1, name: "Paneer Butter Masala", qty: "250g", cals: 420, p: 18, c: 20, f: 30 },
    { id: 2, name: "Roti", qty: "2 pieces", cals: 220, p: 6, c: 44, f: 2 }
  ],
  totalCals: 640
};

export default function FoodScanner() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate AI API call delay
    setTimeout(() => {
      setResults(MOCK_AI_RESULT);
      setIsAnalyzing(false);
    }, 2500);
  };

  const updateItemQty = (id: number, delta: number) => {
    // In a real app, you'd recalculate macros based on proportion
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 h-16 flex items-center justify-between">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold">Scan Meal</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <div className="p-4 space-y-6">
        {!image ? (
          <div className="mt-8">
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageCapture}
            />
            
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-12 rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors group"
              >
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-lg shadow-primary/25">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Take a Photo</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Snap a picture of your meal and let AI do the rest
                </p>
              </button>
              
              <button 
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.removeAttribute('capture');
                    fileInputRef.current.click();
                  }
                }}
                className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-colors"
              >
                <ImageIcon className="w-5 h-5" />
                <span>Upload from Gallery</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="relative rounded-3xl overflow-hidden aspect-square bg-secondary shadow-md border border-border">
              <img src={image} alt="Meal" className="w-full h-full object-cover" />
              <button 
                onClick={() => {
                  setImage(null);
                  setResults(null);
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                  <Sparkles className="w-10 h-10 mb-4 animate-pulse text-primary" />
                  <h3 className="font-semibold text-lg">AI is analyzing...</h3>
                  <p className="text-sm opacity-80 mt-1">Identifying food items & portion sizes</p>
                </div>
              )}
            </div>

            {/* Results */}
            <AnimatePresence>
              {results && !isAnalyzing && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium text-center">
                      AI estimates may have uncertainty. Please verify and adjust quantities if needed.
                    </p>
                  </div>

                  <h3 className="font-semibold text-lg">Identified Items</h3>
                  
                  <div className="space-y-3">
                    {results.items.map((item: any) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.cals} kcal</p>
                            </div>
                            <div className="flex items-center space-x-3 bg-secondary/50 rounded-full p-1 border border-border">
                              <button className="w-8 h-8 rounded-full bg-background shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground">
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-sm font-medium w-16 text-center">{item.qty}</span>
                              <button className="w-8 h-8 rounded-full bg-background shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground">
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2">
                            <MacroBadge label="Protein" value={`${item.p}g`} color="bg-blue-500/10 text-blue-600 dark:text-blue-400" />
                            <MacroBadge label="Carbs" value={`${item.c}g`} color="bg-orange-500/10 text-orange-600 dark:text-orange-400" />
                            <MacroBadge label="Fat" value={`${item.f}g`} color="bg-purple-500/10 text-purple-600 dark:text-purple-400" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Estimated</p>
                      <p className="text-2xl font-bold text-primary">{results.totalCals} <span className="text-sm font-normal text-muted-foreground">kcal</span></p>
                    </div>
                    <button className="bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl active:scale-[0.98] transition-all">
                      Log Meal
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function MacroBadge({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-2 rounded-xl ${color}`}>
      <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">{label}</span>
      <span className="font-semibold text-sm">{value}</span>
    </div>
  );
}
