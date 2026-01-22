'use client';

import { useState } from 'react';

interface ReportButtonProps {
  stationName: string;
  country: string;
  lang?: string;
}

export default function ReportButton({ stationName, country, lang = 'es' }: ReportButtonProps) {
  const [showModal, setShowModal] = useState(false);
  
  const translations = {
    es: {
      buttonText: '¿No suena? Reportar problema',
      modalTitle: 'Reportar problema con la emisora',
      modalDescription: 'Si la emisora no está sonando correctamente, puedes enviarnos un reporte para que lo revisemos.',
      openForm: 'Abrir formulario de reporte',
      cancel: 'Cancelar',
      thanks: '¡Gracias por ayudarnos a mejorar!',
    },
    en: {
      buttonText: "Not playing? Report issue",
      modalTitle: 'Report station issue',
      modalDescription: "If the station isn't playing correctly, you can fill out our report form.",
      openForm: 'Open report form',
      cancel: 'Cancel',
      thanks: 'Thanks for helping us improve!',
    },
    pt: {
      buttonText: 'Não está tocando? Reportar problema',
      modalTitle: 'Reportar problema com a emissora',
      modalDescription: 'Se a emissora não está tocando corretamente, você pode preencher nosso formulário de relatório.',
      openForm: 'Abrir formulário de relatório',
      cancel: 'Cancelar',
      thanks: 'Obrigado por nos ajudar a melhorar!',
    },
    fr: {
      buttonText: 'Ça ne marche pas? Signaler un problème',
      modalTitle: 'Signaler un problème avec la station',
      modalDescription: "Si la station ne fonctionne pas correctement, vous pouvez remplir notre formulaire.",
      openForm: 'Ouvrir le formulaire',
      cancel: 'Annuler',
      thanks: 'Merci de nous aider à améliorer!',
    },
    it: {
      buttonText: 'Non funziona? Segnala problema',
      modalTitle: 'Segnala problema con la stazione',
      modalDescription: 'Se la stazione non funziona correttamente, puoi compilare il nostro modulo.',
      openForm: 'Apri modulo di segnalazione',
      cancel: 'Annulla',
      thanks: 'Grazie per aiutarci a migliorare!',
    },
  };
  
  const t = translations[lang as keyof typeof translations] || translations.es;
  
  const handleReportClick = () => {
    setShowModal(true);
  };
  
  // URL base del formulario de Google
  const FORM_BASE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc1w6dtMiIGs0Qj_bTRh0WeD6wGBZFMdRrihh9Sz4WD_4k-fg/viewform';
  const ENTRY_ID_STATION = 'entry.1643391482'; // ID del campo "¿Qué emisora falla?"

  const handleReport = () => {
    // Construir URL con parámetro prellenado
    const prefilledUrl = `${FORM_BASE_URL}?usp=pp_url&${ENTRY_ID_STATION}=${encodeURIComponent(stationName)}`;
    
    // Abrir formulario en nueva pestaña
    window.open(prefilledUrl, '_blank', 'noopener,noreferrer');
    setShowModal(false);
  };
  
  return (
    <>
      {/* Report Button - Discreto pero visible */}
      <button
        onClick={handleReportClick}
        className="flex items-center justify-center gap-2 px-4 py-2 mt-4 mx-auto text-sm text-slate-400 hover:text-slate-200 border border-slate-600/50 hover:border-slate-500 rounded-lg transition-all duration-200 hover:bg-slate-800/50"
        aria-label={t.buttonText}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-4 h-4"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
        <span>{t.buttonText}</span>
      </button>
      
      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="w-5 h-5 text-amber-400"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">{t.modalTitle}</h3>
            </div>
            
            {/* Content */}
            <p className="text-slate-300 mb-4 text-sm">{t.modalDescription}</p>
            
            <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
              <p className="text-slate-400 text-sm">
                <span className="text-white font-semibold">{stationName}</span>
                <br />
                <span className="text-slate-500">{country}</span>
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 text-slate-400 hover:text-white border border-slate-600 hover:border-slate-500 rounded-xl transition-colors text-sm"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleReport}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-amber-500/25 text-sm"
              >
                {t.openForm}
              </button>
            </div>
            
            {/* Thanks note */}
            <p className="text-center text-slate-500 text-xs mt-4">{t.thanks}</p>
          </div>
        </div>
      )}
    </>
  );
}
