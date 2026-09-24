'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Building2, 
  LayoutDashboard, 
  Percent, 
  FileText, 
  CheckCircle2, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  Layers
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    // Check local token or session
    const token = localStorage.getItem('admin_token');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else if (token) {
      setAdminUser({ name: 'Administrator', email: 'admin@anandfinancial.com' });
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    document.cookie = 'admin_token=; Max-Age=0; path=/';
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Loan Products', href: '/admin/loans', icon: Layers },
    { name: 'Interest Rates', href: '/admin/rates', icon: Percent },
    { name: 'Document List', href: '/admin/documents', icon: FileText },
    { name: 'Eligibility Rules', href: '/admin/eligibility', icon: CheckCircle2 },
    { name: 'Customer Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'FAQ Manager', href: '/admin/faqs', icon: HelpCircle },
    { name: 'Website Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A2540] text-white flex flex-col justify-between shrink-0 shadow-xl border-r border-blue-900">
        <div>
          {/* Logo Branding */}
          <div className="p-5 border-b border-blue-900/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white tracking-tight leading-tight">
                ANAND FINANCIAL
              </div>
              <div className="text-[10px] text-blue-300 font-semibold tracking-wider">
                ADMIN CONTROL PANEL
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-blue-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-200" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin Info & Logout */}
        <div className="p-4 border-t border-blue-900/80 bg-blue-950/60 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Admin User</div>
              <div className="text-[10px] text-blue-300 truncate">admin@anandfinancial.com</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <Link href="/" target="_blank" className="text-blue-300 hover:text-white text-[11px]">
              View Live Website
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold text-[11px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8">
        {children}
      </main>

    </div>
  );
}
