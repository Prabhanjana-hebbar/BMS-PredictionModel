import { useState } from 'react';
import Hero from './components/Hero';
import PredictionForm from './components/PredictionForm';
import PredictionResults from './components/PredictionResults';
import About from './components/About';
import Authors from './components/Authors';
import { BatteryInput, BatteryPrediction } from './types/battery';
import { predictBatteryHealth } from './utils/randomForest';
import { Battery } from 'lucide-react';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<BatteryPrediction | null>(null);
  const [lastInput, setLastInput] = useState<BatteryInput | null>(null);

  const handleGetStarted = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('prediction-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePredict = async (input: BatteryInput) => {
    setIsLoading(true);
    setPrediction(null);
    setLastInput(input);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = predictBatteryHealth(input);
    setPrediction(result);
    setIsLoading(false);

    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleNewAnalysis = () => {
    setPrediction(null);
    setTimeout(() => {
      document.getElementById('prediction-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Battery className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BMS Analytics</span>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={handleGetStarted}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Analyze
              </button>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-slate-300 hover:text-white transition-colors"
              >
                About
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Hero onGetStarted={handleGetStarted} />

      {showForm && (
        <div id="prediction-section" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Battery Health Analysis</h2>
              <p className="text-xl text-slate-400">Enter your battery parameters for real-time prediction</p>
            </div>
            <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
          </div>
        </div>
      )}

      {prediction && (
        <div id="results-section" className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <PredictionResults prediction={prediction} input={lastInput || undefined} />
            <div className="text-center mt-12">
              <button
                onClick={handleNewAnalysis}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
              >
                Run New Analysis
              </button>
            </div>
          </div>
        </div>
      )}

      <Authors />

      <About />

      <footer className="bg-slate-900 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/10">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Project</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Battery Management System using advanced machine learning for health prediction
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Authors</h4>
              <div className="text-xs text-slate-400 space-y-1">
                <p>Niharika S S</p>
                <p>Poorvika K V</p>
                <p>Prabhanjana M P</p>
                <p>Ranjit Hegde</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Technology</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Built with React, TypeScript, Tailwind CSS, and Recharts. Powered by Random Forest ML algorithms.
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-xs mb-2">
              Powered by Random Forest Machine Learning
            </p>
            <p className="text-slate-600 text-xs">
              © 2024 Battery Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
