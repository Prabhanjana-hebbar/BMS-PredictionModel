import { Users, Github, Mail } from 'lucide-react';

const authors = [
  {
    name: 'Niharika S S',
    role: 'Research & Development',
    color: 'from-blue-500 to-cyan-500',
    icon: '🔬',
  },
  {
    name: 'Poorvika K V',
    role: 'Data Analytics',
    color: 'from-purple-500 to-pink-500',
    icon: '📊',
  },
  {
    name: 'Prabhanjana M P',
    role: 'Project Lead',
    color: 'from-green-500 to-emerald-500',
    icon: '⚡',
  },
  {
    name: 'Ranjit Hegde',
    role: 'Technical Architecture',
    color: 'from-orange-500 to-red-500',
    icon: '🏗️',
  },
];

export default function Authors() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6 animate-fade-in">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Meet the Team</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Project Authors
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A dedicated team of researchers and engineers building advanced battery management solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {authors.map((author, index) => (
            <div
              key={index}
              className="group relative overflow-hidden p-6 bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-lg rounded-2xl border border-white/10 transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${author.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                <div className="text-5xl mb-4">{author.icon}</div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text" style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}>
                  {author.name}
                </h3>

                <p className={`text-sm font-semibold bg-gradient-to-r ${author.color} bg-clip-text text-transparent mb-4`}>
                  {author.role}
                </p>

                <p className="text-xs text-slate-400 mb-6">
                  Contributing to innovation in battery management systems
                </p>

                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <span className="text-xs text-slate-500">Project Contributor</span>
                </div>
              </div>

              <div className={`absolute inset-0 bg-gradient-to-br ${author.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden p-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 animate-fade-in">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              About This Project
            </h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              This Battery Management System was developed as a collaborative research initiative to advance the field of battery health monitoring. Our team combines expertise in data analytics, machine learning, and electrical engineering to create practical solutions for real-world battery management challenges.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Using Random Forest algorithms and data-driven approaches, we've created a system that accurately predicts State of Health (SOH), State of Charge (SOC), and Remaining Useful Life (RUL) even under irregular charging conditions, with applications in IoT devices, electric vehicles, and industrial systems.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 text-center hover:bg-white/10 transition-colors duration-300 hover:scale-105">
            <div className="text-4xl mb-3">🧪</div>
            <h4 className="text-lg font-semibold text-white mb-2">Research Driven</h4>
            <p className="text-sm text-slate-400">Built on academic research and proven methodologies</p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 text-center hover:bg-white/10 transition-colors duration-300 hover:scale-105">
            <div className="text-4xl mb-3">🤝</div>
            <h4 className="text-lg font-semibold text-white mb-2">Collaborative</h4>
            <p className="text-sm text-slate-400">Developed through teamwork and shared expertise</p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 text-center hover:bg-white/10 transition-colors duration-300 hover:scale-105">
            <div className="text-4xl mb-3">💡</div>
            <h4 className="text-lg font-semibold text-white mb-2">Innovative</h4>
            <p className="text-sm text-slate-400">Pushing boundaries in battery health monitoring</p>
          </div>
        </div>
      </div>
    </div>
  );
}
