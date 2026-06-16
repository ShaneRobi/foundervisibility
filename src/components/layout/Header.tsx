import React from 'react';
import { Sparkles, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Header() {
  return (
    <header className="border-b-4 border-memphis-purple bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-memphis-coral to-memphis-orange flex items-center justify-center transform rotate-12 shadow-lg">
            <Sparkles className="w-6 h-6 text-white -rotate-12" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-memphis-purple">
              Visibility OS
            </h1>
            <p className="text-sm text-muted-foreground">
              Founder Mission Control
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="rounded-full border-2 border-memphis-purple relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-memphis-coral text-white text-xs">
              3
            </Badge>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full border-2 border-memphis-green">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
