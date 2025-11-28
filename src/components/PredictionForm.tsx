import { useState } from 'react';
import { Zap, Gauge, Thermometer, RotateCcw, Calculator } from 'lucide-react';
import { BatteryInput } from '../types/battery';

interface PredictionFormProps {
  onPredict: (input: BatteryInput) => void;
  isLoading: boolean;
}

export default function PredictionForm({ onPredict, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<BatteryInput>({
    current: 2.0,
    voltage: 3.8,
    temperature: 25,
    cycleCount: 100,
  });

  const handleChange = (field: keyof BatteryInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const handleReset = () => {
    setFormData({
      current: 2.0,
      voltage: 3.8,
      temperature: 25,
      cycleCount: 100,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Battery Parameters</h2>
          <p className="text-slate-400 text-sm">Enter your battery metrics for analysis</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Zap className="w-4 h-4 text-blue-400" />
              Current (A)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={formData.current}
                onChange={(e) => handleChange('current', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/10"
                placeholder="Enter current in Amperes"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
            <p className="mt-2 text-xs text-slate-500">Typical range: 0.5 - 5.0 A</p>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Gauge className="w-4 h-4 text-cyan-400" />
              Voltage (V)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={formData.voltage}
                onChange={(e) => handleChange('voltage', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/10"
                placeholder="Enter voltage"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
            <p className="mt-2 text-xs text-slate-500">Typical range: 3.0 - 4.2 V</p>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Thermometer className="w-4 h-4 text-orange-400" />
              Temperature (°C)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => handleChange('temperature', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/10"
                placeholder="Enter temperature"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
            <p className="mt-2 text-xs text-slate-500">Typical range: 0 - 50 °C</p>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <RotateCcw className="w-4 h-4 text-green-400" />
              Cycle Count
            </label>
            <div className="relative">
              <input
                type="number"
                step="1"
                value={formData.cycleCount}
                onChange={(e) => handleChange('cycleCount', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/10"
                placeholder="Enter cycle count"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
            <p className="mt-2 text-xs text-slate-500">Number of charge-discharge cycles</p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing...
              </span>
            ) : (
              'Predict Battery Health'
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-4 bg-white/5 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
