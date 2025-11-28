import { BatteryPrediction } from '../types/battery';
import { Battery, Activity, Clock, TrendingDown, CheckCircle } from 'lucide-react';

interface PredictionResultsProps {
  prediction: BatteryPrediction;
}

export default function PredictionResults({ prediction }: PredictionResultsProps) {
  const sohPercentage = prediction.soh * 100;
  const confidencePercentage = prediction.confidence * 100;

  const getHealthStatus = (soh: number) => {
    if (soh >= 0.9) return { text: 'Excellent', color: 'text-green-400', bg: 'bg-green-500' };
    if (soh >= 0.8) return { text: 'Good', color: 'text-blue-400', bg: 'bg-blue-500' };
    if (soh >= 0.7) return { text: 'Fair', color: 'text-yellow-400', bg: 'bg-yellow-500' };
    if (soh >= 0.6) return { text: 'Poor', color: 'text-orange-400', bg: 'bg-orange-500' };
    return { text: 'Critical', color: 'text-red-400', bg: 'bg-red-500' };
  };

  const healthStatus = getHealthStatus(prediction.soh);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-300">Analysis Complete</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Battery Health Report</h2>
        <p className="text-slate-400">Comprehensive analysis powered by Random Forest ML</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group relative overflow-hidden p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-2xl border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-400/40">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-400/30 transition-colors"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Battery className="w-6 h-6 text-blue-400" />
              </div>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${healthStatus.color} bg-white/10`}>
                {healthStatus.text}
              </span>
            </div>

            <h3 className="text-sm font-medium text-slate-400 mb-2">State of Health (SOH)</h3>
            <div className="text-4xl font-bold text-white mb-4">
              {sohPercentage.toFixed(1)}%
            </div>

            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${healthStatus.bg} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${sohPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg rounded-2xl border border-cyan-500/20 transition-all duration-300 hover:scale-105 hover:border-cyan-400/40">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-400/30 transition-colors"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-sm font-semibold px-3 py-1 rounded-full text-cyan-400 bg-white/10">
                Current
              </span>
            </div>

            <h3 className="text-sm font-medium text-slate-400 mb-2">State of Charge (SOC)</h3>
            <div className="text-4xl font-bold text-white mb-4">
              {prediction.soc.toFixed(1)}%
            </div>

            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${prediction.soc}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg rounded-2xl border border-green-500/20 transition-all duration-300 hover:scale-105 hover:border-green-400/40">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-400/30 transition-colors"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-sm font-semibold px-3 py-1 rounded-full text-green-400 bg-white/10">
                Cycles
              </span>
            </div>

            <h3 className="text-sm font-medium text-slate-400 mb-2">Remaining Useful Life (RUL)</h3>
            <div className="text-4xl font-bold text-white mb-4">
              {prediction.rul}
            </div>

            <p className="text-sm text-slate-400">
              Estimated remaining cycles
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Degradation Rate</h3>
              <p className="text-sm text-slate-400">Per cycle degradation</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {prediction.degradationRate.toFixed(4)}%
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${Math.min(prediction.degradationRate * 10, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Prediction Confidence</h3>
              <p className="text-sm text-slate-400">Model accuracy score</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {confidencePercentage.toFixed(1)}%
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                style={{ width: `${confidencePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Recommendations
        </h3>
        <div className="space-y-3">
          {prediction.soh < 0.8 && (
            <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <p className="text-sm text-slate-300">
                Battery health is below optimal. Consider reducing high-current discharge cycles.
              </p>
            </div>
          )}
          {prediction.soc < 20 && (
            <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
              <p className="text-sm text-slate-300">
                Low state of charge detected. Charge your battery soon to prevent deep discharge.
              </p>
            </div>
          )}
          {prediction.rul < 200 && (
            <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
              <p className="text-sm text-slate-300">
                Battery approaching end of life. Plan for replacement soon.
              </p>
            </div>
          )}
          {prediction.soh >= 0.9 && prediction.rul >= 500 && (
            <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <p className="text-sm text-slate-300">
                Battery is in excellent condition. Continue current usage patterns.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
