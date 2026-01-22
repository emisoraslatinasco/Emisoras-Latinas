'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  createPageUrl?: (page: number) => string;
  compact?: boolean;
}

interface PageButtonProps {
  page: number;
  label: React.ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  createPageUrl?: (page: number) => string;
  onPageChange?: (page: number) => void;
  compact: boolean;
}

const PageButton = ({ page, label, disabled, isActive, createPageUrl, onPageChange, compact }: PageButtonProps) => {
  const baseClasses = `rounded-lg transition-all flex items-center justify-center ${
    compact ? 'px-2 py-1.5 text-sm min-w-[32px]' : 'px-4 py-2 min-w-[40px]'
  } ${
    isActive
      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/50'
      : 'bg-slate-800 text-white hover:bg-slate-700'
  } ${disabled ? 'opacity-50 cursor-not-allowed hover:bg-slate-800' : ''}`;

  if (createPageUrl && !disabled) {
    return (
      <Link 
        href={createPageUrl(page)}
        className={baseClasses}
        aria-label={typeof label === 'string' ? label : `Página ${page}`}
        aria-current={isActive ? 'page' : undefined}
        scroll={true} // Scroll to top by default
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      onClick={() => onPageChange?.(page)}
      disabled={disabled}
      className={baseClasses}
      aria-label={typeof label === 'string' ? label : `Página ${page}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </button>
  );
};

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  createPageUrl,
  compact = false 
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 4; // Mostrar 4 botones principales
    
    if (totalPages <= showPages + 2) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar primera página
      pages.push(1);
      
      // Determinar rango de páginas a mostrar
      let start: number;
      let end: number;
      
      if (currentPage <= 3) {
        // Cerca del inicio: mostrar 1, 2, 3, 4, ..., última
        start = 2;
        end = showPages;
      } else if (currentPage >= totalPages - 2) {
        // Cerca del final: mostrar 1, ..., (últimas 4 páginas)
        start = totalPages - showPages + 1;
        end = totalPages - 1;
      } else {
        // En el medio: mostrar 1, ..., actual-1, actual, actual+1, actual+2, ..., última
        start = currentPage - 1;
        end = currentPage + 2;
      }
      
      // Agregar puntos suspensivos si es necesario
      if (start > 2) {
        pages.push('...');
      }
      
      // Agregar páginas del rango
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }
      
      // Agregar puntos suspensivos finales si es necesario
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Siempre mostrar última página
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className={`flex items-center ${compact ? 'gap-1' : 'justify-center gap-2'}`}>
      <PageButton 
        page={currentPage - 1} 
        label="←" 
        disabled={currentPage === 1}
        createPageUrl={createPageUrl}
        onPageChange={onPageChange}
        compact={compact}
      />

      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <PageButton 
            key={index}
            page={page}
            label={page}
            isActive={currentPage === page}
            createPageUrl={createPageUrl}
            onPageChange={onPageChange}
            compact={compact}
          />
        ) : (
          <span key={index} className={`text-slate-500 ${compact ? 'px-1' : 'px-2'}`}>
            {page}
          </span>
        )
      ))}

      <PageButton 
        page={currentPage + 1} 
        label="→" 
        disabled={currentPage === totalPages}
        createPageUrl={createPageUrl}
        onPageChange={onPageChange}
        compact={compact}
      />
    </div>
  );
}
