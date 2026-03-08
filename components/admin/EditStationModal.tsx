'use client';

import { useState } from 'react';
import { AdminAPI, Station } from '@/lib/api-admin';
import { countries } from '@/data/stationsByCountry';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface EditStationModalProps {
  station: Station;
  onClose: () => void;
  onSave: () => void;
}

const getLogoUrl = (logoUrl: string) => {
  if (!logoUrl) return '/logos_general/logo_miniatura_emisoras_latinas.jpg';
  if (logoUrl.startsWith('http')) return logoUrl;
  if (logoUrl.startsWith('/static/')) {
    return API_BASE_URL.replace('/api', '') + logoUrl;
  }
  return API_BASE_URL.replace('/api', '') + '/static' + logoUrl;
};

export default function EditStationModal({ station, onClose, onSave }: EditStationModalProps) {
  const [formData, setFormData] = useState({
    nombre: station.nombre,
    urlStream: station.urlStream,
    logoUrl: station.logoUrl,
    sliderUrl: station.sliderUrl || '',
    descripcion: station.descripcion,
    descripcionExtendida: station.descripcionExtendida || '',
    ciudad: station.ciudad,
    frecuencia: station.frecuencia || '',
    sitioWeb: station.sitioWeb || '',
    eslogan: station.eslogan || '',
    fundacion: station.fundacion || '',
    priority: station.priority,
    activo: station.activo,
    countryCode: station.country.code,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>(getLogoUrl(station.logoUrl));
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('La imagen no debe superar los 2MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Solo se permiten archivos de imagen');
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Preparar datos sin logoUrl
      const { logoUrl: _logoUrl, ...dataWithoutLogo } = formData;
      
      if (logoFile) {
        // Si hay nuevo archivo, subir y agregar logoUrl
        setUploadingLogo(true);
        const { logoUrl } = await AdminAPI.uploadStationLogo(station.id, logoFile);
        await AdminAPI.updateStation(station.id, { ...dataWithoutLogo, logoUrl });
        setUploadingLogo(false);
      } else {
        // Si no hay nuevo archivo, actualizar sin logoUrl
        await AdminAPI.updateStation(station.id, dataWithoutLogo);
      }
      
      onSave();
    } catch {
      setError('Error al actualizar la emisora');
    } finally {
      setLoading(false);
      setUploadingLogo(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg p-6 max-w-6xl w-full border border-slate-700 max-h-[90vh] overflow-y-auto my-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Editar Emisora</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Ciudad *
              </label>
              <input
                type="text"
                value={formData.ciudad}
                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                País *
              </label>
              <select
                value={formData.countryCode}
                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Frecuencia
              </label>
              <input
                type="text"
                value={formData.frecuencia}
                onChange={(e) => setFormData({ ...formData, frecuencia: e.target.value })}
                placeholder="Ej: 95.5 FM"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                URL de Stream *
              </label>
              <input
                type="url"
                value={formData.urlStream}
                onChange={(e) => setFormData({ ...formData, urlStream: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                URL del Slider
              </label>
              <input
                type="url"
                value={formData.sliderUrl}
                onChange={(e) => setFormData({ ...formData, sliderUrl: e.target.value })}
                placeholder="https://ejemplo.com/slider.jpg"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Logo de la Emisora
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={logoPreview || '/placeholder-logo.png'}
                    alt="Logo preview"
                    className="w-20 h-20 object-cover rounded-lg border-2 border-slate-600"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Formatos: JPG, PNG, GIF. Máximo 2MB.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Sitio Web
              </label>
              <input
                type="url"
                value={formData.sitioWeb}
                onChange={(e) => setFormData({ ...formData, sitioWeb: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Eslogan
              </label>
              <input
                type="text"
                value={formData.eslogan}
                onChange={(e) => setFormData({ ...formData, eslogan: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Año de Fundación
              </label>
              <input
                type="text"
                value={formData.fundacion}
                onChange={(e) => setFormData({ ...formData, fundacion: e.target.value })}
                placeholder="Ej: 1995"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Prioridad
              </label>
              <input
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Descripción Extendida
              </label>
              <textarea
                value={formData.descripcionExtendida}
                onChange={(e) => setFormData({ ...formData, descripcionExtendida: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                  className="w-4 h-4 bg-slate-700 border-slate-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span>Emisora activa</span>
              </label>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Guardando...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
