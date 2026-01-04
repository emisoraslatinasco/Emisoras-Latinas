'use client';

interface AdSpaceProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export default function AdSpace({ 
  width = 'w-full',
  height = 'h-24',
  label = 'Espacio publicitario',
  className = '',
  orientation = 'horizontal'
}: AdSpaceProps) {
  const dimensionLabel = orientation === 'vertical' ? '160x600' : '970x90';
  
  return (
    <aside 
      className={`${className}`}
      aria-label={label}
    >
      <div 
        className={`${width} ${height} bg-slate-800/50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600`}
      >
        <p className="text-slate-500 text-xs font-medium text-center px-2">
          {label} {dimensionLabel}
        </p>
      </div>
    </aside>
  );
}
