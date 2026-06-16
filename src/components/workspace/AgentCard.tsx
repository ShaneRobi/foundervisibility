import React from 'react';
import { Activity, Settings, MoreVertical, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Agent, AgentStatus } from '@/lib/types/agent';

interface AgentCardProps {
  agent: Agent;
}

const statusConfig: Record<AgentStatus, { color: string; label: string; pulse: boolean }> = {
  active: { color: 'memphis-green', label: 'Active', pulse: true },
  idle: { color: 'memphis-purple', label: 'Idle', pulse: false },
  warning: { color: 'memphis-orange', label: 'Warning', pulse: true },
  error: { color: 'memphis-coral', label: 'Error', pulse: false },
  connecting: { color: 'memphis-cyan', label: 'Connecting', pulse: true },
};

const colorClasses = {
  coral: 'from-memphis-coral to-memphis-orange',
  purple: 'from-memphis-purple to-memphis-coral',
  green: 'from-memphis-green to-memphis-cyan',
  cyan: 'from-memphis-cyan to-memphis-purple',
  orange: 'from-memphis-orange to-memphis-yellow',
  yellow: 'from-memphis-yellow to-memphis-green',
};

export function AgentCard({ agent }: AgentCardProps) {
  const status = statusConfig[agent.status];
  const gradientClass = colorClasses[agent.color as keyof typeof colorClasses];

  return (
    <Card className="border-4 border-memphis-purple rounded-2xl overflow-hidden transform hover:scale-105 transition-all hover:shadow-2xl bg-white">
      <div className={cn('h-3 bg-gradient-to-r', gradientClass)} />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn(
                'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg shadow-lg transform -rotate-6',
                gradientClass
              )}>
                {agent.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg text-memphis-purple">
                  {agent.name}
                </h3>
                <Badge variant="outline" className="text-xs border-2">
                  {agent.type}
                </Badge>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl border-2">
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Activity className="w-4 h-4 mr-2" />
                View Logs
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Circle 
            className={cn(
              'w-3 h-3',
              status.pulse && 'animate-pulse'
            )}
            fill={`hsl(var(--memphis-${status.color.split('-')[1]}))`}
            color={`hsl(var(--memphis-${status.color.split('-')[1]}))`}
          />
          <span className="text-sm font-medium">{status.label}</span>
          <span className="text-xs text-muted-foreground ml-auto">
            {agent.lastActivity}
          </span>
        </div>

        <div className="bg-muted/50 rounded-xl p-3 border-2 border-dashed border-memphis-purple/20">
          <p className="text-sm font-medium text-memphis-purple mb-1">
            Current Task
          </p>
          <p className="text-sm text-muted-foreground">
            {agent.currentTask}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Connected Tools
          </p>
          <div className="flex flex-wrap gap-2">
            {agent.connectedTools.map((tool) => (
              <Badge 
                key={tool} 
                variant="secondary"
                className="rounded-full bg-memphis-pink border-2 border-memphis-purple/20"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t-2 border-dashed border-memphis-purple/20">
          <p className="text-xs text-muted-foreground">
            Provider: <span className="font-medium text-foreground">{agent.provider}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
