import React, { createContext, useContext, useEffect, useState } from 'react';
import { Agent, AgentMessage } from '@/lib/types/agent';
import { ChatchatService } from '@/lib/services/chatchat';
import { toast } from 'sonner';

interface AgentContextType {
  agents: Agent[];
  isConnected: boolean;
  addAgent: (agent: Omit<Agent, 'id' | 'chatchatId'>) => Promise<void>;
  removeAgent: (agentId: string) => Promise<void>;
  sendMessage: (agentId: string, content: string) => Promise<void>;
  subscribeToAgent: (agentId: string, handler: (message: AgentMessage) => void) => () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [chatchatService, setChatchatService] = useState<ChatchatService | null>(null);

  useEffect(() => {
    // Initialize Chatchat connection
    const apiKey = import.meta.env.VITE_CHATCHAT_API_KEY;
    
    if (!apiKey) {
      toast.error('Chatchat API key not configured', {
        description: 'Add VITE_CHATCHAT_API_KEY to your .env file',
      });
      return;
    }

    const service = new ChatchatService(apiKey);
    setChatchatService(service);

    service.connect()
      .then(() => {
        setIsConnected(true);
        toast.success('Connected to Chatchat', {
          description: 'Your AI agents are ready to work',
        });
      })
      .catch((error) => {
        console.error('Failed to connect to Chatchat:', error);
        toast.error('Failed to connect to Chatchat', {
          description: 'Check your API key and network connection',
        });
      });

    return () => {
      service.disconnect();
    };
  }, []);

  const addAgent = async (agentData: Omit<Agent, 'id' | 'chatchatId'>) => {
    if (!chatchatService) {
      throw new Error('Chatchat service not initialized');
    }

    try {
      const agent = await chatchatService.registerAgent(agentData);
      setAgents((prev) => [...prev, agent]);
      
      toast.success(`${agent.name} connected`, {
        description: 'Agent is ready to start working',
      });
    } catch (error) {
      console.error('Failed to add agent:', error);
      toast.error('Failed to add agent', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  };

  const removeAgent = async (agentId: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== agentId));
    toast.info('Agent disconnected');
  };

  const sendMessage = async (agentId: string, content: string) => {
    if (!chatchatService) {
      throw new Error('Chatchat service not initialized');
    }

    const agent = agents.find((a) => a.id === agentId);
    if (!agent?.chatchatId) {
      throw new Error('Agent not found');
    }

    await chatchatService.sendMessage(agent.chatchatId, content);
  };

  const subscribeToAgent = (agentId: string, handler: (message: AgentMessage) => void) => {
    if (!chatchatService) {
      return () => {};
    }

    const agent = agents.find((a) => a.id === agentId);
    if (!agent?.chatchatId) {
      return () => {};
    }

    return chatchatService.onAgentMessage(agent.chatchatId, handler);
  };

  return (
    <AgentContext.Provider
      value={{
        agents,
        isConnected,
        addAgent,
        removeAgent,
        sendMessage,
        subscribeToAgent,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgents() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgents must be used within AgentProvider');
  }
  return context;
}
