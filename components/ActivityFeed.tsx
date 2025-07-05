
import React from 'react';
import { useAppContext } from '../contexts/AppContext.tsx';
import { MainTab, Report } from '../types.ts';
import { excelService } from '../services/excelService.ts';
import ActivityItem from './ActivityItem.tsx';

interface ActivityFeedProps {
  category: MainTab;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ category }) => {
  const { reports } = useAppContext();

  const filteredReports = reports
    .filter(report => report.category === category)
    .sort((a, b) => b.timestamp - a.timestamp);

  const groupedReports = filteredReports.reduce((acc, report) => {
    const date = new Date(report.timestamp).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(report);
    return acc;
  }, {} as Record<string, Report[]>);

  const handleDownload = () => {
    excelService.exportToExcel(filteredReports, category);
  };

  if (filteredReports.length === 0) {
    return (
      <div className="text-center py-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-slate-900">Belum ada laporan</h3>
        <p className="mt-1 text-sm text-slate-500">Buat laporan baru di tab "Lapor".</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-right">
        <button
          onClick={handleDownload}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Excel
        </button>
      </div>
      {Object.entries(groupedReports).map(([date, dateReports]) => (
        <div key={date}>
          <h3 className="text-lg font-semibold text-slate-600 pb-2 mb-4 border-b border-slate-200">{date}</h3>
          <div className="space-y-4">
            {dateReports.map(report => (
              <ActivityItem key={report.id} report={report} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
