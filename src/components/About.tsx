import { BookOpen, Brain, TrendingUp, Zap, ExternalLink, User } from 'lucide-react';

export default function About() {
  const researchPapers = [
    {
      title: "Battery Health Indexing using Data Analytics Techniques",
      authors: "Research Team",
      year: "2024",
      description: "Comprehensive study on using Random Forest and data analytics for battery health assessment in EVs and IoT devices.",
      link: "#"
    },
    {
      title: "Energy and Environmental Impact of Battery Electric Vehicles",
      authors: "Yuan, X., Li, L., Gou, H., and Dong, T.",
      year: "2015",
      journal: "Applied Energy, vol. 157, pp. 75–84",
      link: "#"
    },
    {
      title: "Regenerative Braking Control Strategy",
      authors: "Biao, J., Xiangwen, Z., et al.",
      year: "2021",
      journal: "International Journal of Automotive Technology",
      link: "#"
    },
    {
      title: "Recycling and Environmental Issues of Lithium-Ion Batteries",
      authors: "Costa, C.M. et al.",
      year: "2021",
      journal: "Energy Storage Materials, vol. 37, pp. 433–465",
      link: "#"
    }
  ];

  return (
    <div id="about" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Technical Documentation</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About Battery Management Systems
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Understanding the science behind battery health prediction and monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">What is a Battery Management System?</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              A Battery Management System (BMS) is an electronic system that manages rechargeable batteries by monitoring their state, calculating secondary data, reporting data, and controlling the environment to ensure safety and longevity.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Modern BMS implementations use advanced machine learning algorithms to predict battery behavior under various operating conditions, enabling proactive maintenance and optimized performance.
            </p>
          </div>

          <div className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Why Battery Health Matters</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Battery-powered systems, from IoT devices to electric vehicles, depend on reliable energy storage. As batteries degrade over time, their capacity, performance, and safety characteristics change significantly.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Accurate health monitoring prevents unexpected failures, optimizes charging strategies, and extends battery lifespan, reducing both costs and environmental impact.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="p-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-lg rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-blue-400" />
              Key Battery Health Indicators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">State of Health (SOH)</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Represents the overall condition and capacity of a battery compared to its ideal state. SOH decreases as the battery ages through charge-discharge cycles, temperature stress, and chemical degradation.
                </p>
              </div>

              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-lg font-semibold text-cyan-400 mb-3">State of Charge (SOC)</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Indicates the current available charge in the battery as a percentage of its maximum capacity. Accurate SOC estimation is crucial for range prediction and preventing over-discharge.
                </p>
              </div>

              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-lg font-semibold text-green-400 mb-3">Remaining Useful Life (RUL)</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Predicts the number of remaining charge-discharge cycles before the battery reaches its end-of-life threshold. RUL estimation enables proactive replacement planning.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Random Forest Machine Learning Approach</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              This system employs a Random Forest algorithm, an ensemble learning method that constructs multiple decision trees during training and outputs the mean prediction of individual trees. This approach offers several advantages:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Robust to Irregular Data</h4>
                  <p className="text-sm text-slate-400">Handles non-uniform charging patterns common in real-world applications</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">High Accuracy</h4>
                  <p className="text-sm text-slate-400">Provides stable predictions without heavy computational resources</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Feature Importance</h4>
                  <p className="text-sm text-slate-400">Identifies which battery parameters most significantly affect health</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Shallow Cycling Support</h4>
                  <p className="text-sm text-slate-400">Works effectively with partial charge-discharge cycles</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Research References</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {researchPapers.map((paper, index) => (
              <div
                key={index}
                className="group p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {paper.title}
                    </h4>
                    <p className="text-sm text-slate-400 mb-1">{paper.authors}</p>
                    <p className="text-xs text-slate-500">{paper.year}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-4" />
                </div>
                {paper.journal && (
                  <p className="text-sm text-slate-400 mb-3 italic">{paper.journal}</p>
                )}
                <p className="text-sm text-slate-300 leading-relaxed">{paper.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl border border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Project Author</h3>
              <p className="text-xl text-blue-400 font-semibold mb-2">Prabhanjana M P</p>
              <p className="text-slate-300 leading-relaxed">
                This Battery Management System was developed as part of research into data-driven approaches for battery health monitoring. The project combines machine learning techniques with practical battery management principles to create an accessible, accurate prediction system.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <p className="text-slate-300">
              For technical inquiries or collaboration opportunities, please refer to the research documentation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
