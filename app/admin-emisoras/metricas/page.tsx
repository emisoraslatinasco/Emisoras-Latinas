'use client';

export default function MetricasPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Métricas</h1>
        <p className="text-slate-400">Estadísticas y análisis del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-broadcast-tower text-blue-500 text-xl"></i>
            </div>
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Total Emisoras</h3>
          <p className="text-3xl font-bold text-white">20,000+</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-globe text-green-500 text-xl"></i>
            </div>
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Países</h3>
          <p className="text-3xl font-bold text-white">8</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-music text-purple-500 text-xl"></i>
            </div>
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Géneros</h3>
          <p className="text-3xl font-bold text-white">50+</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-yellow-500 text-xl"></i>
            </div>
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Activas</h3>
          <p className="text-3xl font-bold text-white">19,500+</p>
        </div>
      </div>

      <div className="mt-8 bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Próximamente</h2>
        <p className="text-slate-400">
          Las métricas detalladas y gráficos estarán disponibles próximamente.
        </p>
      </div>
    </div>
  );
}
