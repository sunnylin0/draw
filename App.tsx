
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { DataImport } from './components/DataImport';
import { LuckyDraw } from './components/LuckyDraw';
import { Grouping } from './components/Grouping';
import { TabType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.IMPORT);
  const [participants, setParticipants] = useState<string[]>([]);

  const handleDataLoaded = useCallback((names: string[]) => {
    setParticipants(names);
    setActiveTab(TabType.DRAW);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        {activeTab === TabType.IMPORT && (
          <DataImport onDataLoaded={handleDataLoaded} currentCount={participants.length} />
        )}

        {activeTab === TabType.DRAW && (
          <LuckyDraw participants={participants} />
        )}

        {activeTab === TabType.GROUP && (
          <Grouping participants={participants} />
        )}
      </main>

      <footer className="py-6 border-t bg-white text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} HR Event Management Tool - Designed for HR Excellence
      </footer>
    </div>
  );
};

export default App;
