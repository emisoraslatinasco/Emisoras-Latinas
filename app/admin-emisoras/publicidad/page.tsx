'use client';

import { useState, useEffect } from 'react';
import { AdminAdsAPI, Advertisement, AdvertisementScope, AdvertisementPosition } from '@/lib/api-admin-ads';
import CreateAdModal from '@/components/admin/CreateAdModal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export default function PublicidadPage() {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const getLogoUrl = (url?: string) => {
    if (!url) return 'https://via.placeholder.com/150x50?text=Sin+Imagen';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/static/')) {
      return API_BASE_URL.replace('/api', '') + url;
    }
    return API_BASE_URL.replace('/api', '') + '/static' + url;
  };

  const loadAds = async () => {
    setLoading(true);
    try {
      const data = await AdminAdsAPI.getAdvertisements();
      setAds(data);
    } catch (error) {
      console.error('Error loading ads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await AdminAdsAPI.deleteAdvertisement(id);
      setDeleteConfirm(null);
      loadAds();
    } catch (error) {
      console.error('Error deleting ad:', error);
      alert('Error al eliminar el banner');
    }
  };

  const handleSave = () => {
    setEditingAd(null);
    setShowCreateModal(false);
    loadAds();
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Publicidad</h1>
          <p className="text-slate-400">Administra los banners publicitarios (Home y Emisoras)</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          Crear Banner
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Banner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Scope / Posición</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Contexto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {ads.map((ad) => (
                  <tr key={ad.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={getLogoUrl(ad.imageUrl)}
                          alt={ad.name}
                          className="w-16 h-10 rounded object-cover border border-slate-600 bg-slate-800"
                        />
                        <div>
                          <div className="text-white font-medium">{ad.name}</div>
                          <div className="text-slate-400 text-xs">Tamaño: {ad.width} x {ad.height}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded mr-2 uppercase">
                        {ad.scope}
                      </span>
                      <span className="text-slate-300 text-sm">{ad.position}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">
                      {ad.scope === AdvertisementScope.GENERAL && (ad.country ? `País: ${ad.country.name}` : 'Mundial')}
                      {ad.scope === AdvertisementScope.STATION && (ad.station ? `Emisora: ${ad.station.nombre}` : 'Todas')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${ad.isActive ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                        {ad.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingAd(ad)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(ad.id)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {ads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                      No hay banners creados aún.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {(showCreateModal || editingAd) && (
        <CreateAdModal
          ad={editingAd || undefined}
          onClose={() => {
            setShowCreateModal(false);
            setEditingAd(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Confirmar Eliminación</h3>
            <p className="text-slate-300 mb-6">
              ¿Estás seguro de que deseas eliminar este banner?
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
    </div>
  );
}
