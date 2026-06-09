'use client';

import { useState, useEffect } from 'react';
import { AdminAPI, Station, PaginatedResponse } from '@/lib/api-admin';
import { countries } from '@/data/stationsByCountry';
import EditStationModal from '@/components/admin/EditStationModal';
import CreateStationModal from '@/components/admin/CreateStationModal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export default function EmisorasPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [vipConfirm, setVipConfirm] = useState<{ station: Station; isVip: boolean } | null>(null);

  const getLogoUrl = (logoUrl: string) => {
    if (!logoUrl) return '/logos_general/logo_miniatura_emisoras_latinas.jpg';
    if (logoUrl.startsWith('http')) return logoUrl;
    if (logoUrl.startsWith('/static/')) {
      return API_BASE_URL.replace(/\/api$/, '') + logoUrl;
    }
    return API_BASE_URL.replace(/\/api$/, '') + '/static' + logoUrl;
  };

  const loadStations = async () => {
    setLoading(true);
    try {
      const response: PaginatedResponse = await AdminAPI.getStations(
        currentPage,
        50,
        selectedCountry || undefined,
        searchQuery || undefined
      );
      setStations(response.data);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      console.error('Error loading stations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStations();
  }, [currentPage, selectedCountry, searchQuery]);

  const handleDelete = async (id: string) => {
    try {
      await AdminAPI.deleteStation(id);
      setDeleteConfirm(null);
      loadStations();
    } catch (error) {
      console.error('Error deleting station:', error);
      alert('Error al eliminar la emisora');
    }
  };

  const handleSave = () => {
    setEditingStation(null);
    setShowCreateModal(false);
    loadStations();
  };

  const handleToggleVip = async (station: Station, isVip: boolean) => {
    try {
      await AdminAPI.toggleVip(station.id, isVip);
      setVipConfirm(null);
      loadStations();
    } catch (error) {
      console.error('Error toggling VIP:', error);
      alert('Error al actualizar VIP');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Emisoras</h1>
          <p className="text-slate-400">Administra las emisoras de radio</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          Crear Emisora
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Buscar emisora por nombre..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <select
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los países</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>

        <div className="text-slate-400 flex items-center">
          Página {currentPage} de {totalPages}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
        </div>
      ) : (
        <>
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Emisora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      País
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Ciudad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Géneros
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {stations.map((station) => (
                    <tr key={station.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={getLogoUrl(station.logoUrl)}
                            alt={station.nombre}
                            className="w-10 h-10 rounded object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/logos_general/logo_miniatura_emisoras_latinas.jpg';
                            }}
                          />
                          <div>
                            <div className="text-white font-medium">{station.nombre}</div>
                            <div className="text-slate-400 text-sm">{station.frecuencia || 'Online'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{station.country.name}</td>
                      <td className="px-6 py-4 text-slate-300">{station.ciudad}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {station.genres.slice(0, 2).map((genre) => (
                            <span
                              key={genre.id}
                              className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded"
                            >
                              {genre.name}
                            </span>
                          ))}
                          {station.genres.length > 2 && (
                            <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded">
                              +{station.genres.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            station.activo
                              ? 'bg-green-600/20 text-green-400'
                              : 'bg-red-600/20 text-red-400'
                          }`}
                        >
                          {station.activo ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setVipConfirm({ station, isVip: !station.isVip })}
                            className={`px-3 py-1.5 text-white text-sm rounded transition-colors ${
                              station.isVip
                                ? 'bg-yellow-600 hover:bg-yellow-700'
                                : 'bg-slate-600 hover:bg-slate-700'
                            }`}
                            title={station.isVip ? 'Remover VIP' : 'Hacer VIP'}
                          >
                            <i className={`fas fa-crown mr-1 ${station.isVip ? 'text-yellow-300' : ''}`}></i>
                            {station.isVip ? 'VIP' : 'VIP'}
                          </button>
                          <button
                            onClick={() => setEditingStation(station)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                          >
                            <i className="fas fa-edit mr-1"></i>
                            Editar
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(station.id)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                          >
                            <i className="fas fa-trash mr-1"></i>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              <span className="text-slate-400">
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      )}

      {/* Edit Modal */}
      {editingStation && (
        <EditStationModal
          station={editingStation}
          onClose={() => setEditingStation(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Confirmar Eliminación</h3>
            <p className="text-slate-300 mb-6">
              ¿Estás seguro de que deseas eliminar esta emisora? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIP Confirmation */}
      {vipConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <i className="fas fa-crown text-yellow-400 text-2xl"></i>
              <h3 className="text-xl font-bold text-white">
                {vipConfirm.isVip ? 'Asignar VIP' : 'Remover VIP'}
              </h3>
            </div>
            <div className="mb-6">
              <p className="text-slate-300 mb-3">
                {vipConfirm.isVip
                  ? '¿Deseas asignar el estado VIP a esta emisora?'
                  : '¿Deseas remover el estado VIP de esta emisora?'}
              </p>
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center gap-3">
                  <img
                    src={getLogoUrl(vipConfirm.station.logoUrl)}
                    alt={vipConfirm.station.nombre}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold">{vipConfirm.station.nombre}</p>
                    <p className="text-slate-400 text-sm">{vipConfirm.station.country.name}</p>
                  </div>
                </div>
              </div>
              {vipConfirm.isVip && (
                <p className="text-yellow-400 text-sm mt-3">
                  <i className="fas fa-info-circle mr-1"></i>
                  La prioridad se establecerá en 50 y aparecerá destacada en el sitio web.
                </p>
              )}
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setVipConfirm(null)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleToggleVip(vipConfirm.station, vipConfirm.isVip)}
                className={`px-4 py-2 text-white rounded-lg transition-colors ${
                  vipConfirm.isVip
                    ? 'bg-yellow-600 hover:bg-yellow-700'
                    : 'bg-slate-600 hover:bg-slate-700'
                }`}
              >
                <i className="fas fa-crown mr-2"></i>
                {vipConfirm.isVip ? 'Asignar VIP' : 'Remover VIP'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Station Modal */}
      {showCreateModal && (
        <CreateStationModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
