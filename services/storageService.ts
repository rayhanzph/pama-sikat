
import { Report } from '../types.ts';

const USER_KEY = 'laporPakUser';
const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

const API_URL = import.meta.env.VITE_API_URL || '';

export const storageService = {
  saveReports: async (reports: Report[]): Promise<void> => {
    try {
      await fetch(`${API_URL}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reports }),
      });
    } catch (error) {
      console.error('Error saving reports to backend:', error);
    }
  },

  loadReports: async (): Promise<Report[]> => {
    try {
      const res = await fetch(`${API_URL}/api/reports`);
      if (!res.ok) throw new Error('Failed to load reports');
      return (await res.json()) as Report[];
    } catch (error) {
      console.error('Error loading reports from backend:', error);
      return [];
    }
  },

  cleanOldReports: (reports: Report[]): Report[] => {
    const now = Date.now();
    const recentReports = reports.filter(report => now - report.timestamp < SEVEN_DAYS_IN_MS);
    if(reports.length !== recentReports.length) {
        storageService.saveReports(recentReports);
    }
    return recentReports;
  },

  saveUser: (user: { name: string; nrp: string }): void => {
    try {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error("Error saving user to localStorage:", error);
    }
  },

  loadUser: (): { name: string; nrp: string } | null => {
    try {
        const userJson = localStorage.getItem(USER_KEY);
        return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
        console.error("Error loading user from localStorage:", error);
        return null;
    }
  },

  clearUser: (): void => {
    localStorage.removeItem(USER_KEY);
  }
};
