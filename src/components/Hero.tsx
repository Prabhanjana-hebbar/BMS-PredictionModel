import { Battery, TrendingUp, Activity } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(14,165,233,0.1),transparent_50%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 animate-fade-in">
          <Activity className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-300">Advanced ML-Powered Battery Analytics</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up">
          Battery Management
          <span className="block mt-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            System
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay">
          Predict State of Health, State of Charge, and Remaining Useful Life using advanced Random Forest machine learning algorithms
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up-delay-2">
          <button
            onClick={onGetStarted}
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2 justify-center">
              Start Analysis
              <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            Learn More
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-delay">
          <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-6 transition-transform">
              <Battery className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">State of Health</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Accurate SOH prediction based on battery degradation patterns
            </p>
          </div>

          <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/30 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-6 transition-transform">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">State of Charge</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Real-time SOC estimation with high precision
            </p>
          </div>

          <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-6 transition-transform">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Remaining Life</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Predict battery lifespan with ML-powered analytics
            </p>
          </div>
        </div>

        <div className="mt-16 text-slate-400 text-sm animate-fade-in-delay">
          <p>Developed by <span className="text-blue-400 font-semibold">Prabhanjana M P</span></p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
