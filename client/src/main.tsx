import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router, Route } from 'wouter';
import CreateReplica from '@client/pages/CreateReplica';
import Chat from '@client/pages/Chat';
import '../index.css';

const client = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={client}>
    <Router>
      <Route path="/create" component={CreateReplica} />
      <Route path="/chat/:id" component={Chat} />
    </Router>
  </QueryClientProvider>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
