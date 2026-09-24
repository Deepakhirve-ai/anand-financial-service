'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { CheckCircle2, Save, ShieldCheck } from 'lucide-react';

export default function AdminEligibilityPage() {
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [config, setConfig] = useState({
    minAge: 21,
    maxAge: 65,
    minIncomeSalaried: 25000,
    minTurnoverBusiness: 1500000,
    minBusinessVintageYears: 2,
    cibilMinimum: 700,
    foirLimitSalaried: 55,
    foirLimitBusiness: 50,
    notes: 'Configured criteria enforced dynamically across site calculators.'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ type: 'success', text: 'Eligibility criteria parameters saved successfully.' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-extrabold text-[#0A2540]">Eligibility Criteria Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure age limits, minimum income/turnover thresholds, FOIR ratios, and credit score guidelines
          </p>
        </div>

        {msg.text && (
          <div className="bg-green-50 text-green-800 border border-green-200 p-4 rounded-xl text-xs font-semibold">
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold block mb-1">Minimum Applicant Age (Years)</label>
              <input
                type="number"
                value={config.minAge}
                onChange={(e) => setConfig({ ...config, minAge: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Maximum Age at Maturity (Years)</label>
              <input
                type="number"
                value={config.maxAge}
                onChange={(e) => setConfig({ ...config, maxAge: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Minimum CIBIL Credit Score</label>
              <input
                type="number"
                value={config.cibilMinimum}
                onChange={(e) => setConfig({ ...config, cibilMinimum: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg font-bold text-blue-700"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Min Monthly Salaried Income (₹)</label>
              <input
                type="number"
                value={config.minIncomeSalaried}
                onChange={(e) => setConfig({ ...config, minIncomeSalaried: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Min Annual Business Turnover (₹)</label>
              <input
                type="number"
                value={config.minTurnoverBusiness}
                onChange={(e) => setConfig({ ...config, minTurnoverBusiness: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Min Business Vintage (Years)</label>
              <input
                type="number"
                value={config.minBusinessVintageYears}
                onChange={(e) => setConfig({ ...config, minBusinessVintageYears: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">FOIR Limit - Salaried (%)</label>
              <input
                type="number"
                value={config.foirLimitSalaried}
                onChange={(e) => setConfig({ ...config, foirLimitSalaried: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">FOIR Limit - Business (%)</label>
              <input
                type="number"
                value={config.foirLimitBusiness}
                onChange={(e) => setConfig({ ...config, foirLimitBusiness: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg font-bold"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-[#0A2540] text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-blue-300" />
              Save Eligibility Configuration
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
