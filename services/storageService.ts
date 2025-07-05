
import { Report } from '../types.ts';

const REPORTS_KEY = 'laporPakReports';
const USER_KEY = 'laporPakUser';

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

export const storageService = {
  saveReports: (reports: Report[]): void => {
    try {
      const reportsJson = JSON.stringify(reports);
      localStorage.setItem(REPORTS_KEY, reportsJson);
    } catch (error) {
      console.error("Error saving reports to localStorage:", error);
    }
  },

  loadReports: (): Report[] => {
    try {
      const reportsJson = localStorage.getItem(REPORTS_KEY);
      return reportsJson ? JSON.parse(reportsJson) : [];
    } catch (error) {
      console.error("Error loading reports from localStorage:", error);
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
