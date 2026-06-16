import React from 'react';
import { AlertCircle } from 'lucide-react';
import { AddAgentDialog } from './AddAgentDialog';
import { AgentCard } from './AgentCard';
import { EmptyState } from './EmptyState';
import { useAgents } from '@/lib/contexts/AgentContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AgentWorkspace() {
  const { agents, isConnected } = useAgents();

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
        <AddAgentDialog />
      </div>

      {!isConnected && (
        <Alert className="border-4 border-memphis-orange rounded-2xl bg-memphis-orange/10">
          <AlertCircle className="h-5 w-5 text-memphis-orange" />
          <AlertTitle className="text-memphis-orange font-bold">Not Connected</AlertTitle>
          <AlertDescription>
            Add your Chatchat API key to <code className="bg-memphis-orange/20 px-2 py-1 rounded">.env</code> file:
            <br />
            <code className="bg-memphis-orange/20 px-2 py-1 rounded mt-2 inline-block">
              VITE_CHATCHAT_API_KEY=your_api_key_here
            </code>
          </AlertDescription>
        </Alert>
      )}

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
