
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext.tsx';
import { MainTab } from '../types.ts';

interface ReportFormProps {
  category: MainTab;
  onReportSubmitted: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ category, onReportSubmitted }) => {
  const { user, addReport } = useAppContext();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [reportText, setReportText] = useState('');
  const [evidence, setEvidence] = useState<string | null>(null);
  const [evidencePreview, setEvidencePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEvidenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if(file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Ukuran file tidak boleh melebihi 5MB.");
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setEvidence(reader.result as string);
        setEvidencePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim() || !evidence) {
      setError('Laporan dan Evidence wajib diisi.');
      return;
    }
    if (!user) {
        setError('User tidak ditemukan. Silakan login kembali.');
        return;
    }
    setIsSubmitting(true);
    setError('');

    // Simulate submission delay
    setTimeout(() => {
        addReport({
            timestamp: Date.now(),
            author: user,
            reportText,
            evidence,
            category,
        });
        setIsSubmitting(false);
        onReportSubmitted();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-100 p-3 rounded-lg">
          <label className="block text-sm font-medium text-slate-600">Waktu dan Tanggal</label>
          <p className="text-slate-800 font-semibold">{currentDateTime.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-slate-100 p-3 rounded-lg">
          <label className="block text-sm font-medium text-slate-600">Kategori Laporan</label>
          <p className="text-slate-800 font-semibold">{category}</p>
        </div>
        <div className="bg-slate-100 p-3 rounded-lg">
          <label className="block text-sm font-medium text-slate-600">Nama Pelapor</label>
          <p className="text-slate-800 font-semibold">{user?.name}</p>
        </div>
        <div className="bg-slate-100 p-3 rounded-lg">
          <label className="block text-sm font-medium text-slate-600">NRP Pelapor</label>
          <p className="text-slate-800 font-semibold">{user?.nrp}</p>
        </div>
      </div>
      
      <div>
        <label htmlFor="laporan" className="block text-sm font-medium text-slate-600 mb-1">
          Laporan
        </label>
        <textarea
          id="laporan"
          rows={4}
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          placeholder="Tuliskan laporan Anda di sini..."
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Evidence</label>
        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                {evidencePreview ? (
                    <img src={evidencePreview} alt="Preview" className="mx-auto h-48 w-auto rounded-md" />
                ) : (
                    <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
                 <div className="flex text-sm text-slate-600 justify-center">
                    <label htmlFor="evidence-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input id="evidence-upload" name="evidence-upload" type="file" className="sr-only" accept="image/*" capture="environment" onChange={handleEvidenceChange} />
                    </label>
                    <p className="pl-1">or take a picture</p>
                </div>
                <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
            </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Mengirim...' : 'Submit Laporan'}
      </button>
    </form>
  );
};

export default ReportForm;
