import React from 'react';
import { 
  LayoutDashboard, 
  Workflow, 
  BookOpen, 
  Lightbulb, 
  FileText, 
  Image, 
  Send, 
  Target,
  BarChart3,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', icon: Home, href: '#home' },
  { name: 'Agent Workspace', icon: LayoutDashboard, href: '#agents', active: true },
  { name: 'Workflow Builder', icon: Workflow, href: '#workflows' },
  { name: 'Thought Vault', icon: BookOpen, href: '#vault' },
  { name: 'Content Ideas', icon: Lightbulb, href: '#ideas' },
  { name: 'Draft Studio', icon: FileText, href: '#drafts' },
  { name: 'Media Library', icon: Image, href: '#media' },
  { name: 'Publishing', icon: Send, href: '#publishing' },
  { name: 'Accountability', icon: Target, href: '#accountability' },
  { name: 'Analytics', icon: BarChart3, href: '#analytics' },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r-4 border-memphis-coral bg-white/95 backdrop-blur-sm min-h-[calc(100vh-73px)] p-4">
      <nav className="space-y-2">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          const colors = [
            'memphis-coral',
            'memphis-purple',
            'memphis-green',
            'memphis-cyan',
            'memphis-orange',
            'memphis-yellow',
          ];
          const color = colors[index % colors.length];
          
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all transform hover:scale-105',
                item.active
                  ? `bg-${color} text-white shadow-lg`
                  : 'text-foreground hover:bg-muted'
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center',
                item.active ? 'bg-white/20' : `bg-${color}/10`
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <span>{item.name}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
