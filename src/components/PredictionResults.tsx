import { useMemo } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { BatteryPrediction, DegradationPoint } from '../types/battery';
import { Battery, Activity, Clock, TrendingDown, CheckCircle, AlertCircle } from 'lucide-react';

interface PredictionResultsProps {
  prediction: BatteryPrediction;
  input?: {
    current: number;
    voltage: number;
    temperature: number;
    cycleCount: number;
  };
}

export default function PredictionResults({ prediction, input }: PredictionResultsProps) {
  const sohPercentage = prediction.soh * 100;
  const confidencePercentage = prediction.confidence * 100;

  const getHealthStatus = (soh: number) => {
    if (soh >= 0.9) return { text: 'Excellent', color: 'text-green-400', bg: 'bg-green-500', light: 'bg-green-500/20' };
    if (soh >= 0.8) return { text: 'Good', color: 'text-blue-400', bg: 'bg-blue-500', light: 'bg-blue-500/20' };
    if (soh >= 0.7) return { text: 'Fair', color: 'text-yellow-400', bg: 'bg-yellow-500', light: 'bg-yellow-500/20' };
    if (soh >= 0.6) return { text: 'Poor', color: 'text-orange-400', bg: 'bg-orange-500', light: 'bg-orange-500/20' };
    return { text: 'Critical', color: 'text-red-400', bg: 'bg-red-500', light: 'bg-red-500/20' };
  };

  const healthStatus = getHealthStatus(prediction.soh);

  const degradationData: DegradationPoint[] = useMemo(() => {
    const data: DegradationPoint[] = [];
    const currentCycle = input?.cycleCount || 100;
    const startCycle = Math.max(0, currentCycle - 500);

    for (let i = startCycle; i <= currentCycle; i += 50) {
      const cycleFraction = i / 1200;
      const projectedSOH = 1 - cycleFraction * (1 - prediction.soh);
      data.push({
        cycle: i,
        soh: Math.max(0.5, Math.min(1, projectedSOH)) * 100,
      });
    }
    return data;
  }, [prediction.soh, input?.cycleCount]);

  const performanceData = [
    { name: 'SOH', value: sohPercentage, fullMark: 100 },
    { name: 'SOC', value: prediction.soc, fullMark: 100 },
    { name: 'RUL', value: Math.min((prediction.rul / 1200) * 100, 100), fullMark: 100 },
    { name: 'Confidence', value: confidencePercentage, fullMark: 100 },
  ];

  const temperatureImpactData = [
    { temp: '0°C', soh: 92, impact: 'High Stress' },
    { temp: '10°C', soh: 95, impact: 'Moderate Stress' },
    { temp: '25°C', soh: 100, impact: 'Optimal' },
    { temp: '40°C', soh: 94, impact: 'Moderate Stress' },
    { temp: '50°C', soh: 88, impact: 'High Stress' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-4 animate-pulse">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-300">Analysis Complete</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Battery Health Report</h2>
        <p className="text-slate-400">Comprehensive analysis powered by Random Forest ML</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group relative overflow-hidden p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-2xl border border-blue-500/20 transition-all duration-500 hover:scale-105 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/20 animate-slide-up">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-400/40 transition-colors duration-500"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                <Battery className="w-7 h-7 text-white" />
              </div>
              <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${healthStatus.color} ${healthStatus.light} border ${healthStatus.color} border-opacity-30`}>
                {healthStatus.text}
              </span>
            </div>

            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">State of Health</h3>
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              {sohPercentage.toFixed(1)}%
            </div>

            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/5">
              <div
                className={`h-full ${healthStatus.bg} rounded-full transition-all duration-1500 ease-out shadow-lg shadow-current`}
                style={{ width: `${sohPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Battery capacity remaining</p>
          </div>
        </div>

        <div className="group relative overflow-hidden p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg rounded-2xl border border-cyan-500/20 transition-all duration-500 hover:scale-105 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-400/40 transition-colors duration-500"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm font-bold px-4 py-1.5 rounded-full text-cyan-400 bg-cyan-500/20 border border-cyan-400 border-opacity-30">
                Current
              </span>
            </div>

            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">State of Charge</h3>
            <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              {prediction.soc.toFixed(1)}%
            </div>

            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1500 ease-out shadow-lg shadow-cyan-500/50"
                style={{ width: `${prediction.soc}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Energy available now</p>
          </div>
        </div>

        <div className="group relative overflow-hidden p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg rounded-2xl border border-green-500/20 transition-all duration-500 hover:scale-105 hover:border-green-400/40 hover:shadow-2xl hover:shadow-green-500/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-400/40 transition-colors duration-500"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm font-bold px-4 py-1.5 rounded-full text-green-400 bg-green-500/20 border border-green-400 border-opacity-30">
                Cycles
              </span>
            </div>

            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Remaining Useful Life</h3>
            <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              {prediction.rul}
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-400">Estimated cycles remaining</p>
              <p className="text-xs text-slate-500">At current usage rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Battery Degradation</h3>
              <p className="text-xs text-slate-400">SOH trend over cycles</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={degradationData}>
              <defs>
                <linearGradient id="colorSoh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="cycle" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#ffffff' }}
              />
              <Area
                type="monotone"
                dataKey="soh"
                stroke="#0ea5e9"
                fillOpacity={1}
                fill="url(#colorSoh)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Performance Metrics</h3>
              <p className="text-xs text-slate-400">Overall system health</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="name" stroke="#94a3b8" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '8px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Temperature Impact Analysis</h3>
            <p className="text-xs text-slate-400">Relative SOH at different temperatures</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={temperatureImpactData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="temp" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#ffffff' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="soh" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Degradation Rate</h3>
              <p className="text-sm text-slate-400">Per cycle degradation</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-white mb-3">
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

        <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Prediction Confidence</h3>
              <p className="text-sm text-slate-400">Model accuracy score</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-white mb-3">
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

      <div className="p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-400" />
          Recommendations
        </h3>
        <div className="space-y-3">
          {prediction.soh < 0.8 && (
            <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl hover:bg-yellow-500/15 transition-colors duration-300">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-300">Battery health is below optimal. Reduce high-current discharge cycles and monitor closely.</p>
            </div>
          )}
          {prediction.soc < 20 && (
            <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl hover:bg-orange-500/15 transition-colors duration-300">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-300">Low state of charge detected. Charge your battery soon to prevent deep discharge.</p>
            </div>
          )}
          {prediction.rul < 200 && (
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/15 transition-colors duration-300">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-300">Battery approaching end of life. Plan for replacement within 1-2 months.</p>
            </div>
          )}
          {prediction.soh >= 0.9 && prediction.rul >= 500 && (
            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl hover:bg-green-500/15 transition-colors duration-300">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-300">Battery is in excellent condition. Continue current usage patterns for optimal lifespan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
