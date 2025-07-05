
import React, { useState } from 'react';
import { MAIN_TABS, SUB_TABS } from '../constants.ts';
import { MainTab, SubTab } from '../types.ts';
import ReportForm from './ReportForm.tsx';
import ActivityFeed from './ActivityFeed.tsx';
import { useAppContext } from '../contexts/AppContext.tsx';

const MainScreen: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>(MainTab.Front);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>(SubTab.Lapor);
  const { user, logout } = useAppContext();

  return (
    <div className="w-full">
       <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-slate-600">Welcome, <span className="font-semibold">{user?.name}</span>!</p>
        <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-slate-200 mb-4">
        {MAIN_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
                setActiveMainTab(tab);
                setActiveSubTab(SubTab.Lapor); // Reset to Lapor tab on main tab change
            }}
            className={`px-4 py-2 text-lg font-medium transition-colors duration-200 ${
              activeMainTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-500 hover:text-blue-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        {SUB_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeSubTab === tab
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {activeSubTab === SubTab.Lapor ? (
          <ReportForm category={activeMainTab} onReportSubmitted={() => setActiveSubTab(SubTab.Activity)} />
        ) : (
          <ActivityFeed category={activeMainTab} />
        )}
      </div>
    </div>
  );
};

export default MainScreen;
