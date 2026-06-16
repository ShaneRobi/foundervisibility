import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import { AgentWorkspace } from '@/components/workspace/AgentWorkspace';

function App() {
  return (
    <>
      <MainLayout>
        <AgentWorkspace />
      </MainLayout>
      <Toaster />
    </>
  );
}

export default App;
