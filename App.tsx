import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PublicHome } from './pages/PublicHome';
import { AdminDashboard } from './pages/AdminDashboard';
import { ClickSound } from './components/ClickSound';

const App = () => {
  return (
    <HashRouter>
      <ClickSound />
      <Layout>
        <Routes>
          <Route path="/" element={<PublicHome />} />
          {/* In a real app, wrap this in an AuthGuard */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;