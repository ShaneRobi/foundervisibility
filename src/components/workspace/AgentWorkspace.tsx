import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgentCard } from './AgentCard';
import { EmptyState } from './EmptyState';

const DEMO_AGENTS = [
  {
    id: '1',
    name: 'Chief of Staff',
    type: 'Coordinator',
    status: 'active' as const,
    provider: 'Chatchat',
    connectedTools: ['Slack', 'Calendar', 'Email'],
    lastActivity: '2 minutes ago',
    currentTask: 'Coordinating content workflow',
    color: 'coral',
  },
  {
    id: '2',
    name: 'Journal Agent',
    type: 'Knowledge',
    status: 'idle' as const,
    provider: 'Chatchat',
    connectedTools: ['Voice Notes', 'Documents'],
    lastActivity: '1 hour ago',
    currentTask: 'Processing voice notes',
    color: 'purple',
  },
  {
    id: '3',
    name: 'Content Strategy',
    type: 'Strategy',
    status: 'active' as const,
    provider: 'Chatchat',
    connectedTools: ['LinkedIn', 'Twitter', 'Analytics'],
    lastActivity: '5 minutes ago',
    currentTask: 'Analyzing audience trends',
    color: 'green',
  },
  {
    id: '4',
    name: 'Writer Agent',
    type: 'Content',
    status: 'active' as const,
    provider: 'Chatchat',
    connectedTools: ['LinkedIn', 'Twitter', 'Instagram'],
    lastActivity: '10 minutes ago',
    currentTask: 'Drafting LinkedIn post',
    color: 'cyan',
  },
  {
    id: '5',
    name: 'Accountability',
    type: 'Execution',
    status: 'warning' as const,
    provider: 'Chatchat',
    connectedTools: ['Telegram', 'Calendar'],
    lastActivity: '30 minutes ago',
    currentTask: 'Monitoring overdue tasks',
    color: 'orange',
  },
  {
    id: '6',
    name: 'Research Agent',
    type: 'Intelligence',
    status: 'idle' as const,
    provider: 'Chatchat',
    connectedTools: ['Web Search', 'News API'],
    lastActivity: '2 hours ago',
    currentTask: 'Awaiting research request',
    color: 'yellow',
  },
];

export function AgentWorkspace() {
  const [agents] = React.useState(DEMO_AGENTS);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-memphis-purple mb-2">
            Agent Workspace
          </h2>
          <p className="text-lg text-muted-foreground">
            Your AI team working 24/7 to amplify your visibility
          </p>
        </div>
        <Button 
          size="lg" 
          className="rounded-full bg-gradient-to-r from-memphis-coral to-memphis-orange text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border-4 border-white"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Agent
        </Button>
      </div>

      {agents.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
