
import { Report, MainTab } from '../types.ts';

declare const XLSX: any;

export const excelService = {
  exportToExcel: (reports: Report[], category: MainTab): void => {
    if (typeof XLSX === 'undefined') {
      console.error("XLSX library is not loaded.");
      alert("Fitur ekspor tidak tersedia. Silakan coba lagi nanti.");
      return;
    }

    const dataToExport = reports.map(report => ({
      'Tanggal & Waktu': new Date(report.timestamp).toLocaleString('id-ID'),
      'Nama Pelapor': report.author.name,
      'NRP Pelapor': report.author.nrp,
      'Kategori': report.category,
      'Laporan': report.reportText,
      'Jumlah Komentar': report.comments.length,
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan Aktivitas');
    
    const fileName = `Laporan_${category}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  },
};
