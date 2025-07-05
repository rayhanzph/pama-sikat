
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext.tsx';

const LoginScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [nrp, setNrp] = useState('');
  const [error, setError] = useState('');
  const { login } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !nrp.trim()) {
      setError('Nama dan NRP tidak boleh kosong.');
      return;
    }
    setError('');
    login({ name, nrp });
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-center text-slate-700 mb-6">Identitas Pelapor</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">
            Nama
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama lengkap Anda"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label htmlFor="nrp" className="block text-sm font-medium text-slate-600 mb-1">
            NRP
          </label>
          <input
            id="nrp"
            type="text"
            value={nrp}
            onChange={(e) => setNrp(e.target.value)}
            placeholder="Masukkan NRP Anda"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
