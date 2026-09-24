'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Percent, TrendingUp, History, CheckCircle2, AlertCircle, Save } from 'lucide-react';

export default function AdminRatesPage() {
  const [rates, setRates] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState<any | null>(null);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const [form, setForm] = useState({
    minRate: 8.75,
    maxRate: 11.50,
    startingRate: 8.75,
    rateType: 'Floating',
    processingFee: '0.50% - 1.00% + GST',
    notes: 'Quarterly policy revision updated via Admin Panel.'
  });

  const loadData = () => {
    setLoading(true);
    fetch('/api/admin/rates')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRates(data.data);
          setHistory(data.history || []);
          if (data.data.length > 0 && !selectedLoan) {
            const first = data.data[0];
            setSelectedLoan(first);
            setForm({
              minRate: first.minRate,
              maxRate: first.maxRate,
              startingRate: first.startingRate,
              rateType: first.rateType,
              processingFee: first.processingFee,
              notes: 'Quarterly rate revision updated'
            });
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectLoan = (r: any) => {
    setSelectedLoan(r);
    setForm({
      minRate: r.minRate,
      maxRate: r.maxRate,
      startingRate: r.startingRate,
      rateType: r.rateType,
      processingFee: r.processingFee,
      notes: `Interest rate revision for ${r.loanName}`
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLoan) return;
    setMsg({ type: '', text: '' });

    try {
      const res = await fetch('/api/admin/rates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loanId: selectedLoan.loanId,
          ...form
        })
      });

      const data = await res.json();

      if (data.success) {
        setMsg({ type: 'success', text: data.message });
        loadData();
      } else {
        setMsg({ type: 'error', text: data.message });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to update interest rate.' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-extrabold text-[#0A2540]">Interest Rate & Pricing Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Update active interest rates, rate types, processing fees, and view historical rate change logs
          </p>
        </div>

        {msg.text && (
          <div className={`p-4 rounded-xl text-xs font-semibold ${
            msg.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {msg.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Rate Update Form */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
            <h2 className="text-lg font-bold text-[#0A2540] border-b border-gray-100 pb-3 flex items-center gap-2">
              <Percent className="w-5 h-5 text-blue-600" />
              Update Loan Product Rate
            </h2>

            {/* Select Product */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700">Select Loan Product</label>
              <div className="grid grid-cols-3 gap-2">
                {rates.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleSelectLoan(r)}
                    className={`p-3 rounded-xl text-xs font-bold border transition-colors ${
                      selectedLoan?.id === r.id
                        ? 'bg-[#0A2540] text-white border-[#0A2540]'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {r.loanName}
                  </button>
                ))}
              </div>
            </div>

            {selectedLoan && (
              <form onSubmit={handleUpdate} className="space-y-4 pt-2 text-xs">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Starting Rate (% p.a.) *</label>
                    <input
                      type="number"
                      step="0.05"
                      required
                      value={form.startingRate}
                      onChange={(e) => setForm({ ...form, startingRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg font-bold text-blue-700"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Min Rate (% p.a.) *</label>
                    <input
                      type="number"
                      step="0.05"
                      required
                      value={form.minRate}
                      onChange={(e) => setForm({ ...form, minRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Max Rate (% p.a.) *</label>
                    <input
                      type="number"
                      step="0.05"
                      required
                      value={form.maxRate}
                      onChange={(e) => setForm({ ...form, maxRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Rate Type *</label>
                    <select
                      value={form.rateType}
                      onChange={(e) => setForm({ ...form, rateType: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    >
                      <option value="Floating">Floating Interest Rate</option>
                      <option value="Fixed">Fixed Interest Rate</option>
                      <option value="Hybrid">Hybrid Interest Rate</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Processing Fee Description</label>
                    <input
                      type="text"
                      value={form.processingFee}
                      onChange={(e) => setForm({ ...form, processingFee: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Rate Change Notes / Justification</label>
                  <input
                    type="text"
                    placeholder="Reason for rate revision (e.g. Repo rate adjustment)..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0A2540] hover:bg-blue-900 text-white font-bold py-3 rounded-xl transition-all shadow flex items-center justify-center gap-2 text-sm"
                >
                  <Save className="w-4 h-4 text-blue-300" />
                  Save & Publish New Interest Rate
                </button>
              </form>
            )}
          </div>

          {/* Rate Change History Audit Log */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
            <h2 className="text-lg font-bold text-[#0A2540] border-b border-gray-100 pb-3 flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              Rate History Audit Log
            </h2>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {history.length > 0 ? (
                history.map(item => (
                  <div key={item.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-[#0A2540]">
                      <span>{item.loanName}</span>
                      <span className="text-blue-600">{item.oldRate}% → {item.newRate}%</span>
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Effective: {item.effectiveDate} • By: {item.updatedBy}
                    </div>
                    {item.notes && <div className="text-[11px] text-gray-600 italic">"{item.notes}"</div>}
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-400 py-6 text-center">
                  No rate history entries logged yet.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
