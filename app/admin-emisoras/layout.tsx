import type { Metadata } from 'next';
import AdminShell from './AdminShell';

// Server layout so the route can export metadata (AdminShell is a client
// component). The admin area must never be indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
