
import React from 'react';
import { useAppContext } from './contexts/AppContext.tsx';
import LoginScreen from './components/LoginScreen.tsx';
import MainScreen from './components/MainScreen.tsx';

const App: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto max-w-2xl p-4">
        <header className="text-center my-6">
          <h1 className="text-4xl font-bold text-slate-800">Lapor PAK!</h1>
          <p className="text-lg text-slate-500">PAMA ARIA</p>
        </header>
        <main className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
            {user ? <MainScreen /> : <LoginScreen />}
        </main>
      </div>
    </div>
  );
};

export default App;
