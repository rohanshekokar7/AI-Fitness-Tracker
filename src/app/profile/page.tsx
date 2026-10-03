"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Settings, User as UserIcon, Bell, Shield, Smartphone, LogOut, ChevronRight } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <header className="pt-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button className="p-2 rounded-full bg-secondary/50 text-foreground">
          <Settings className="w-5 h-5" />
        </button>
      </header>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6 flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center border-2 border-primary/20">
            <UserIcon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <p className="text-sm text-muted-foreground">Goal: Gain muscle</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Age" value="28" />
        <StatCard label="Weight" value="70 kg" />
        <StatCard label="Height" value="175 cm" />
      </div>

      {/* Settings Sections */}
      <section className="space-y-4">
        <h3 className="font-semibold px-2 text-muted-foreground uppercase tracking-wider text-xs">Account</h3>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            <SettingsRow icon={UserIcon} label="Personal Information" color="text-blue-500" bg="bg-blue-500/10" />
            <SettingsRow icon={Bell} label="Notifications" color="text-orange-500" bg="bg-orange-500/10" />
            <SettingsRow icon={Smartphone} label="Connected Devices" color="text-green-500" bg="bg-green-500/10" />
            <SettingsRow icon={Shield} label="Privacy & Security" color="text-purple-500" bg="bg-purple-500/10" />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="font-semibold px-2 text-muted-foreground uppercase tracking-wider text-xs">More</h3>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            <button className="w-full flex items-center p-4 hover:bg-secondary/50 transition-colors text-destructive">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center mr-3">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="font-medium">Sign Out</span>
            </button>
          </CardContent>
        </Card>
      </section>

      <div className="h-6"></div>
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: string }) {
  return (
    <Card className="bg-secondary/50 border-none shadow-none">
      <CardContent className="p-4 text-center">
        <p className="text-xl font-bold mb-1">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

function SettingsRow({ icon: Icon, label, color, bg }: any) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
