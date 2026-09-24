'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Settings, Save, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    companyName: 'ANAND FINANCIAL SERVICE',
    tagline: 'Your Trusted Guide to Smarter Loan Solutions',
    supportingLine: 'Understand Your Loan. Know Your Options. Make an Informed Decision.',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'contact@anandfinancialservice.com',
    address: 'Plot No. 45, Finance Tower, Main Commercial Complex, City Center, PIN - 400001',
    businessHours: 'Monday – Saturday: 9:30 AM – 6:30 PM (Closed on Sundays & Public Holidays)',
    disclaimer: '',
    bankDisclosure: ''
  });

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success) setSettings(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      const data = await res.json();

      if (data.success) {
        setMsg({ type: 'success', text: 'Website settings updated successfully! Public site refreshed.' });
      } else {
        setMsg({ type: 'error', text: 'Failed to update settings.' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Network error saving settings.' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-extrabold text-[#0A2540]">Website Settings & Contact Control</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure contact numbers, office address, business hours, and statutory disclosures
          </p>
        </div>

        {msg.text && (
          <div className={`p-4 rounded-xl text-xs font-semibold ${
            msg.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6 text-xs">
          
          <div className="border-b border-gray-100 pb-3 font-bold text-sm text-[#0A2540]">
            1. Brand Identity & Header Text
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Primary Tagline *</label>
              <input
                type="text"
                required
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="border-b border-gray-100 pb-3 font-bold text-sm text-[#0A2540] pt-2">
            2. Customer Contact Details (Reflected dynamically across Header, Contact page & Footer)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold block mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">WhatsApp Helpline *</label>
              <input
                type="text"
                required
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Official Email Address *</label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">Registered Office Address *</label>
            <input
              type="text"
              required
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Official Business Hours *</label>
            <input
              type="text"
              required
              value={settings.businessHours}
              onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="border-b border-gray-100 pb-3 font-bold text-sm text-[#0A2540] pt-2">
            3. Statutory Disclaimers & Ujjivan SFB Disclosure
          </div>

          <div>
            <label className="font-semibold block mb-1">Bank Relationship Disclosure Statement *</label>
            <textarea
              rows={2}
              required
              value={settings.bankDisclosure}
              onChange={(e) => setSettings({ ...settings, bankDisclosure: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Mandatory General Disclaimer Notice *</label>
            <textarea
              rows={3}
              required
              value={settings.disclaimer}
              onChange={(e) => setSettings({ ...settings, disclaimer: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-[#0A2540] hover:bg-blue-900 text-white font-bold px-8 py-3 rounded-xl transition-all shadow flex items-center gap-2 text-sm"
            >
              <Save className="w-4 h-4 text-blue-300" />
              Save All Website Settings
            </button>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
}
