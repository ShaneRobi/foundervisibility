import React, { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAgents } from '@/lib/contexts/AgentContext';
import { AgentType, AgentColor } from '@/lib/types/agent';
import { toast } from 'sonner';

const AGENT_TYPES: { value: AgentType; label: string; description: string }[] = [
  { value: 'Coordinator', label: 'Chief of Staff', description: 'Orchestrates all other agents' },
  { value: 'Knowledge', label: 'Journal Agent', description: 'Processes thoughts and notes' },
  { value: 'Strategy', label: 'Content Strategy', description: 'Analyzes trends and opportunities' },
  { value: 'Content', label: 'Writer Agent', description: 'Creates content drafts' },
  { value: 'Intelligence', label: 'Research Agent', description: 'Gathers information' },
  { value: 'Media', label: 'Media Agent', description: 'Manages visual assets' },
  { value: 'Publishing', label: 'Publishing Agent', description: 'Distributes content' },
  { value: 'Execution', label: 'Accountability Agent', description: 'Tracks commitments' },
];

const COLORS: AgentColor[] = ['coral', 'purple', 'green', 'cyan', 'orange', 'yellow'];

export function AddAgentDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addAgent } = useAgents();

  const [formData, setFormData] = useState({
    name: '',
    type: '' as AgentType,
    systemPrompt: '',
    tools: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      await addAgent({
        name: formData.name,
        type: formData.type,
        status: 'connecting',
        provider: 'Chatchat',
        connectedTools: formData.tools.split(',').map(t => t.trim()).filter(Boolean),
        lastActivity: 'Just now',
        currentTask: 'Initializing...',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        config: {
          systemPrompt: formData.systemPrompt || `You are a ${formData.type} agent helping entrepreneurs build visibility.`,
          tools: formData.tools.split(',').map(t => t.trim()).filter(Boolean),
          capabilities: [],
          triggers: [],
        },
      });

      setOpen(false);
      setFormData({ name: '', type: '' as AgentType, systemPrompt: '', tools: '' });
    } catch (error) {
      console.error('Failed to add agent:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="rounded-full bg-gradient-to-r from-memphis-coral to-memphis-orange text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border-4 border-white"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-2xl border-4 border-memphis-purple">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-memphis-coral to-memphis-orange flex items-center justify-center transform -rotate-6">
              <Sparkles className="w-6 h-6 text-white rotate-6" />
            </div>
            <div>
              <DialogTitle className="text-2xl text-memphis-purple">Connect New Agent</DialogTitle>
              <DialogDescription>
                Add a Chatchat AI agent to your workspace
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-memphis-purple font-semibold">
              Agent Name *
            </Label>
            <Input
              id="name"
              placeholder="e.g., Chief of Staff"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-xl border-2 border-memphis-purple/20"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-memphis-purple font-semibold">
              Agent Type *
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as AgentType })}
            >
              <SelectTrigger className="rounded-xl border-2 border-memphis-purple/20">
                <SelectValue placeholder="Select agent type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2">
                {AGENT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div className="font-semibold">{type.label}</div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="systemPrompt" className="text-memphis-purple font-semibold">
              System Prompt (Optional)
            </Label>
            <Textarea
              id="systemPrompt"
              placeholder="Customize how this agent behaves..."
              value={formData.systemPrompt}
              onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
              className="rounded-xl border-2 border-memphis-purple/20 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tools" className="text-memphis-purple font-semibold">
              Connected Tools (Optional)
            </Label>
            <Input
              id="tools"
              placeholder="e.g., Slack, Calendar, Email (comma-separated)"
              value={formData.tools}
              onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
              className="rounded-xl border-2 border-memphis-purple/20"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full border-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full bg-gradient-to-r from-memphis-coral to-memphis-orange text-white border-4 border-white"
            >
              {loading ? 'Connecting...' : 'Connect Agent'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
