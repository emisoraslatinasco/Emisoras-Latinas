'use client';

import { useState, useRef, useEffect } from 'react';
import { AdminAdsAPI, Advertisement, AdvertisementScope, AdvertisementPosition } from '@/lib/api-admin-ads';
import { AdminAPI, Station } from '@/lib/api-admin';
import { getCountries, Country as ApiCountry } from '@/lib/api';

interface CreateAdModalProps {
  onClose: () => void;
  onSave: () => void;
  ad?: Advertisement;
}

export default function CreateAdModal({ onClose, onSave, ad }: CreateAdModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Lista de estaciones para el select, al buscar por scope 'STATION'
  const [stations, setStations] = useState<Station[]>([]);
  const [countries, setCountries] = useState<ApiCountry[]>([]);

  const [formData, setFormData] = useState({
    name: ad?.name || '',
    scope: ad?.scope || AdvertisementScope.GENERAL,
    position: ad?.position || AdvertisementPosition.HOME_TOP,
    linkUrl: ad?.linkUrl || '',
    width: ad?.width || '100%',
    height: ad?.height || 'auto',
    isActive: ad?.isActive ?? true,
    countryId: ad?.country?.id || undefined,
    stationId: ad?.station?.id || undefined,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Si entramos en modo estación y no hay, traemos todas (o algunas) para listar.
    // Lo simple aquí es usar AdminAPI para traer estaciones activas para asociarles el banner.
    // Solo si el scope es STATION.
    if (formData.scope === AdvertisementScope.STATION) {
      AdminAPI.getStations(1, 400).then(res => setStations(res.data)).catch(()=> {});
    }
    
    // Cargar países dinámicamente desde API para tener los UUID reales
    if (formData.scope === AdvertisementScope.GENERAL && countries.length === 0) {
       getCountries().then(setCountries).catch(()=> {});
    }
  }, [formData.scope, countries.length]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const getLogoUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/static/')) return API_BASE_URL.replace('/api', '') + url;
    return API_BASE_URL.replace('/api', '') + '/static' + url;
  };
  
  useEffect(() => {
     if (ad?.imageUrl) setImagePreview(getLogoUrl(ad.imageUrl));
  }, [ad]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen no debe superar los 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Filter clear values depending on scope
    const submitData = { ...formData };
    if (submitData.scope === AdvertisementScope.GENERAL) submitData.stationId = undefined;
    if (submitData.scope === AdvertisementScope.STATION) submitData.countryId = undefined;

    // Optional field cleans
    if(submitData.countryId === "") submitData.countryId = undefined;
    if(submitData.stationId === "") submitData.stationId = undefined;

    try {
      let savedAd: Advertisement;

      if (ad) {
        savedAd = await AdminAdsAPI.updateAdvertisement(ad.id, submitData);
      } else {
        savedAd = await AdminAdsAPI.createAdvertisement(submitData);
      }

      // Upload image
      if (imageFile) {
        await AdminAdsAPI.uploadAdvertisementImage(savedAd.id, imageFile);
      }

      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el banner');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full border border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">
            {ad ? 'Editar Banner' : 'Crear Nuevo Banner'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nombre identificador
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. Promo Diciembre Home"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Ámbito (Scope)
              </label>
              <select
                value={formData.scope}
                onChange={(e) => {
                  const newScope = e.target.value as AdvertisementScope;
                  setFormData({ 
                    ...formData, 
                    scope: newScope,
                    position: newScope === AdvertisementScope.STATION 
                      ? AdvertisementPosition.STATION_UNDER_REPORT 
                      : AdvertisementPosition.HOME_TOP
                  });
                }}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={AdvertisementScope.GENERAL}>General (País / Home)</option>
                <option value={AdvertisementScope.STATION}>Personal (Emisora)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Posición
              </label>
              <select
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value as AdvertisementPosition })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {formData.scope === AdvertisementScope.GENERAL ? (
                    <>
                        <option value={AdvertisementPosition.HOME_TOP}>Arriba (debajo selector)</option>
                        <option value={AdvertisementPosition.HOME_RIGHT}>Derecha (aside)</option>
                        <option value={AdvertisementPosition.HOME_BOTTOM}>Abajo (footer / paginación)</option>
                    </>
                ) : (
                        <option value={AdvertisementPosition.STATION_UNDER_REPORT}>Debajo Reportar Problema</option>
                )}
              </select>
            </div>

            {formData.scope === AdvertisementScope.GENERAL && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  País (Opcional - Todos si está vacío)
                </label>
                <select
                  value={formData.countryId || ''}
                  onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos los Países</option>
                  {countries.map(c => <option key={c.code} value={c.id || c.code}>{c.name}</option>)}
                </select>
              </div>
            )}

            {formData.scope === AdvertisementScope.STATION && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Emisora Específica (Opcional - Todas si vacio)
                </label>
                <select
                  value={formData.stationId || ''}
                  onChange={(e) => setFormData({ ...formData, stationId: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Cualquier Emisora</option>
                  {stations.map(s => <option key={s.id} value={s.id}>{s.nombre} ({s.country.name})</option>)}
                </select>
              </div>
            )}

            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-300 mb-2">URL de Redireccionamiento (Destino al clickear)</label>
              <input
                type="url"
                value={formData.linkUrl}
                onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ejemplo.com"
              />
            </div>
            
            <div className="flex gap-4 col-span-full">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Estilo (Width)</label>
                    <input
                        type="text"
                        value={formData.width}
                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        placeholder="Ej. '100%', '728px'"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Estilo (Height)</label>
                    <input
                        type="text"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        placeholder="Ej. '90px', 'auto'"
                    />
                </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Imagen Banner
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  imagePreview 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-slate-600 bg-slate-900 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="h-full object-contain p-2" />
                ) : (
                  <div className="text-slate-400 text-center">
                    <i className="fas fa-image text-3xl mb-2"></i>
                    <p>Click para seleccionar imagen</p>
                    <p className="text-xs mt-1">PNG, JPG o WEBP (Max 5MB)</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-800"
                />
                <span className="text-slate-300 font-medium">Banner Activo</span>
              </label>
            </div>
          </div>

          <div className="mt-8 flex gap-3 justify-end border-t border-slate-700 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || (!ad && !imageFile)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Guardando...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  Guardar Banner
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
