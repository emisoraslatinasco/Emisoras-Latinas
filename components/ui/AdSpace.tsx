"use client";

interface AdSpaceProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export default function AdSpace({
  width = "w-full",
  height = "h-24",
  label = "Espacio publicitario",
  className = "",
  orientation = "horizontal",
}: AdSpaceProps) {
  const dimensionLabel = orientation === "vertical" ? "160x600" : "970x90";

  // Detectar si estamos en producción
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <aside className={`${className}`} aria-label={label}>
      <div
        className={`${width} ${height} ${
          isProduction
            ? "bg-transparent" // Transparente en producción
            : "bg-slate-800/50 border-2 border-dashed border-slate-600" // Visible en desarrollo
        } rounded-lg flex items-center justify-center`}
      >
        {!isProduction && (
          <p className="text-slate-500 text-xs font-medium text-center px-2">
            {label} {dimensionLabel}
          </p>
        )}
      </div>
    </aside>
  );
}
