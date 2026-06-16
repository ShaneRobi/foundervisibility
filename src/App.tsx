import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import { AgentWorkspace } from '@/components/workspace/AgentWorkspace';
import { AgentProvider } from '@/lib/contexts/AgentContext';

function App() {
  return (
    <AgentProvider>
      <MainLayout>
        <AgentWorkspace />
      </MainLayout>
      <Toaster />
    </AgentProvider>
  );
}

export default App;
