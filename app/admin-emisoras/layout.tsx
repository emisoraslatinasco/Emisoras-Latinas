'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminAPI } from '@/lib/api-admin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token && pathname !== '/admin-emisoras') {
      router.push('/admin-emisoras');
    } else {
      setIsAuthenticated(!!token);
    }
    setLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    AdminAPI.logout();
    router.push('/admin-emisoras');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
      </div>
    );
  }

  if (pathname === '/admin-emisoras') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <i className="fas fa-radio text-blue-500"></i>
            Admin Panel
          </h1>
          <p className="text-sm text-slate-400 mt-1">Emisoras Latinas</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin-emisoras/metricas"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  pathname === '/admin-emisoras/metricas'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <i className="fas fa-chart-line w-5"></i>
                <span>Métricas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin-emisoras/emisoras"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  pathname.startsWith('/admin-emisoras/emisoras')
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <i className="fas fa-broadcast-tower w-5"></i>
                <span>Emisoras</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 transition-all"
          >
            <i className="fas fa-sign-out-alt w-5"></i>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
