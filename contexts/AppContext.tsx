
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, Report, Comment } from '../types.ts';
import { storageService } from '../services/storageService.ts';

interface AppContextType {
  user: User | null;
  reports: Report[];
  login: (user: User) => void;
  logout: () => void;
  addReport: (report: Omit<Report, 'id' | 'comments'>) => void;
  addComment: (reportId: string, text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadedUser = storageService.loadUser();
    if (loadedUser) {
      setUser(loadedUser);
    }
    const loadedReports = storageService.loadReports();
    const recentReports = storageService.cleanOldReports(loadedReports);
    setReports(recentReports);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if(isInitialized){
        storageService.saveReports(reports);
    }
  }, [reports, isInitialized]);

  const login = (userData: User) => {
    setUser(userData);
    storageService.saveUser(userData);
  };

  const logout = () => {
    setUser(null);
    storageService.clearUser();
  }

  const addReport = useCallback((reportData: Omit<Report, 'id' | 'comments'>) => {
    const newReport: Report = {
      ...reportData,
      id: `report-${Date.now()}-${Math.random()}`,
      comments: [],
    };
    setReports(prevReports => [...prevReports, newReport]);
  }, []);

  const addComment = useCallback((reportId: string, text: string) => {
    if (!user) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}-${Math.random()}`,
      author: user,
      text,
      timestamp: Date.now(),
    };
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId
          ? { ...report, comments: [...report.comments, newComment] }
          : report
      )
    );
  }, [user]);

  const value = { user, reports, login, logout, addReport, addComment };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
