import React from 'react';
import { Sparkles, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function EmptyState() {
  return (
    <Card className="border-4 border-dashed border-memphis-purple rounded-3xl p-12 text-center bg-gradient-to-br from-memphis-pink/20 to-memphis-yellow/20">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-memphis-coral to-memphis-orange flex items-center justify-center transform rotate-12 shadow-2xl">
          <Sparkles className="w-12 h-12 text-white -rotate-12" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-memphis-purple">
            No Agents Connected
          </h3>
          <p className="text-lg text-muted-foreground">
            Connect your first AI agent to start building your visibility
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            size="lg" 
            className="rounded-full bg-gradient-to-r from-memphis-coral to-memphis-orange text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border-4 border-white w-full"
          >
            <Plus className="w-5 h-5 mr-2" />
            Connect Your First Agent
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Agents are powered by Chatchat and managed through this platform
          </p>
        </div>
      </div>
    </Card>
  );
}
