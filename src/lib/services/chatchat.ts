import { Agent, AgentMessage } from '@/lib/types/agent';

export class ChatchatService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private messageHandlers: Map<string, (message: AgentMessage) => void> = new Map();

  constructor(private apiKey: string, private wsUrl: string = 'wss://api.chatchat.ai/v1/ws') {}

  /**
   * Connect to Chatchat WebSocket
   */
  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(`${this.wsUrl}?apiKey=${this.apiKey}`);

        this.ws.onopen = () => {
          console.log('✅ Connected to Chatchat');
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = (event) => {
          const message = JSON.parse(event.data) as AgentMessage;
          this.handleMessage(message);
        };

        this.ws.onerror = (error) => {
          console.error('❌ Chatchat connection error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('🔌 Disconnected from Chatchat');
          this.attemptReconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Register a new agent with Chatchat
   */
  async registerAgent(agent: Omit<Agent, 'id' | 'chatchatId'>): Promise<Agent> {
    const response = await fetch('https://api.chatchat.ai/v1/agents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        name: agent.name,
        type: agent.type,
        config: agent.config,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to register agent: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      ...agent,
      id: crypto.randomUUID(),
      chatchatId: data.id,
      status: 'idle',
      lastActivity: new Date().toISOString(),
    };
  }

  /**
   * Send a message to a specific agent
   */
  async sendMessage(agentId: string, content: string, metadata?: Record<string, unknown>): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('Not connected to Chatchat');
    }

    const message = {
      type: 'agent_message',
      agentId,
      content,
      metadata,
      timestamp: new Date().toISOString(),
    };

    this.ws.send(JSON.stringify(message));
  }

  /**
   * Subscribe to messages from a specific agent
   */
  onAgentMessage(agentId: string, handler: (message: AgentMessage) => void): () => void {
    this.messageHandlers.set(agentId, handler);
    
    // Return unsubscribe function
    return () => {
      this.messageHandlers.delete(agentId);
    };
  }

  /**
   * Get agent status from Chatchat
   */
  async getAgentStatus(chatchatId: string): Promise<{ status: string; currentTask?: string }> {
    const response = await fetch(`https://api.chatchat.ai/v1/agents/${chatchatId}/status`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get agent status: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Disconnect from Chatchat
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private handleMessage(message: AgentMessage): void {
    const handler = this.messageHandlers.get(message.agentId);
    if (handler) {
      handler(message);
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      
      console.log(`🔄 Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect().catch(console.error);
      }, delay);
    }
  }
}
