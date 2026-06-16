export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  provider: 'Chatchat';
  connectedTools: string[];
  lastActivity: string;
  currentTask: string;
  color: AgentColor;
  config: AgentConfig;
  chatchatId?: string;
}

export type AgentType = 
  | 'Coordinator'
  | 'Knowledge'
  | 'Strategy'
  | 'Content'
  | 'Execution'
  | 'Intelligence'
  | 'Media'
  | 'Publishing';

export type AgentStatus = 'active' | 'idle' | 'warning' | 'error' | 'connecting';

export type AgentColor = 'coral' | 'purple' | 'green' | 'cyan' | 'orange' | 'yellow';

export interface AgentConfig {
  systemPrompt: string;
  tools: string[];
  capabilities: string[];
  triggers: AgentTrigger[];
  escalationRules?: EscalationRule[];
}

export interface AgentTrigger {
  type: 'schedule' | 'event' | 'manual';
  condition: string;
  action: string;
}

export interface EscalationRule {
  condition: string;
  action: string;
  notifyUser: boolean;
}

export interface AgentMessage {
  id: string;
  agentId: string;
  type: 'task' | 'update' | 'question' | 'result';
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}
