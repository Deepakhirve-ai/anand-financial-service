'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { 
  Layers, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function AdminLoansPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLoan, setEditingLoan] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const fetchLoans = () => {
    setLoading(true);
    fetch('/api/admin/loans')
      .then(res => res.json())
      .then(data => {
        if (data.success) setLoans(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const openCreateModal = () => {
    setEditingLoan({
      name: '',
      slug: '',
      category: 'HOME_LOAN',
      shortDescription: '',
      fullDescription: '',
      minLoanAmount: 500000,
      maxLoanAmount: 10000000,
      minInterestRate: 8.75,
      maxInterestRate: 11.50,
      startingInterestRate: 8.75,
      interestType: 'Floating',
      minTenure: 36,
      maxTenure: 360,
      processingFee: '0.50% - 1.00% of loan amount + taxes',
      otherCharges: 'Documentation and legal verification charges at actuals',
      eligibility: ['Age: 21 to 65 years', 'Minimum Monthly Income: ₹25,000'],
      documents: ['PAN Card', 'Aadhaar Card', 'Income Proof'],
      features: ['Competitive interest rate', 'Flexible tenure'],
      purposes: ['Primary property purchase'],
      status: 'ACTIVE'
    });
    setModalOpen(true);
  };

  const openEditModal = (loan: any) => {
    setEditingLoan({ ...loan });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    try {
      const isEdit = !!editingLoan.id;
      const url = isEdit ? `/api/admin/loans/${editingLoan.id}` : '/api/admin/loans';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingLoan)
      });

      const data = await res.json();

      if (data.success) {
        setMsg({ type: 'success', text: data.message });
        setModalOpen(false);
        fetchLoans();
      } else {
        setMsg({ type: 'error', text: data.message });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to save loan product.' });
    }
  };

  const toggleStatus = async (loan: any) => {
    const newStatus = loan.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      const res = await fetch(`/api/admin/loans/${loan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchLoans();
    } catch (err) {}
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0A2540]">Admin Loan Management</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Add, edit, or configure loan products, limits, and pricing details
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" />
            Add New Loan Product
          </button>
        </div>

        {msg.text && (
          <div className={`p-4 rounded-xl text-xs font-semibold ${
            msg.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {msg.text}
          </div>
        )}

        {/* Loan Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-xs uppercase tracking-wider text-[#0A2540]">
            Configured Loan Products
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0A2540] text-white font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Loan Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Starting Rate</th>
                  <th className="py-3 px-4">Rate Range</th>
                  <th className="py-3 px-4">Rate Type</th>
                  <th className="py-3 px-4">Amount Limits</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loans.map(loan => (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-[#0A2540]">{loan.name}</td>
                    <td className="py-3 px-4 font-semibold text-gray-600">{loan.category}</td>
                    <td className="py-3 px-4 font-extrabold text-blue-600">{loan.startingInterestRate}% p.a.</td>
                    <td className="py-3 px-4">{loan.minInterestRate}% - {loan.maxInterestRate}%</td>
                    <td className="py-3 px-4 font-medium">{loan.interestType}</td>
                    <td className="py-3 px-4 font-semibold">₹{(loan.minLoanAmount/100000).toFixed(1)}L - ₹{(loan.maxLoanAmount/100000).toFixed(1)}L</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStatus(loan)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          loan.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {loan.status}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => openEditModal(loan)}
                        className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-3 py-1 rounded font-semibold transition-colors mr-2"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {modalOpen && editingLoan && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
              <h3 className="text-xl font-bold text-[#0A2540] border-b border-gray-100 pb-3">
                {editingLoan.id ? 'Edit Loan Product' : 'Add New Loan Product'}
              </h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Loan Name *</label>
                    <input
                      type="text"
                      required
                      value={editingLoan.name}
                      onChange={(e) => setEditingLoan({ ...editingLoan, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">URL Slug *</label>
                    <input
                      type="text"
                      required
                      value={editingLoan.slug}
                      onChange={(e) => setEditingLoan({ ...editingLoan, slug: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Category *</label>
                    <select
                      value={editingLoan.category}
                      onChange={(e) => setEditingLoan({ ...editingLoan, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    >
                      <option value="HOME_LOAN">HOME_LOAN</option>
                      <option value="BUSINESS_LOAN">BUSINESS_LOAN</option>
                      <option value="LOAN_AGAINST_PROPERTY">LOAN_AGAINST_PROPERTY</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Starting Interest Rate (% p.a.) *</label>
                    <input
                      type="number"
                      step="0.05"
                      required
                      value={editingLoan.startingInterestRate}
                      onChange={(e) => setEditingLoan({ ...editingLoan, startingInterestRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Min Interest Rate (%) *</label>
                    <input
                      type="number"
                      step="0.05"
                      required
                      value={editingLoan.minInterestRate}
                      onChange={(e) => setEditingLoan({ ...editingLoan, minInterestRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Max Interest Rate (%) *</label>
                    <input
                      type="number"
                      step="0.05"
                      required
                      value={editingLoan.maxInterestRate}
                      onChange={(e) => setEditingLoan({ ...editingLoan, maxInterestRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Min Loan Amount (₹) *</label>
                    <input
                      type="number"
                      required
                      value={editingLoan.minLoanAmount}
                      onChange={(e) => setEditingLoan({ ...editingLoan, minLoanAmount: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Max Loan Amount (₹) *</label>
                    <input
                      type="number"
                      required
                      value={editingLoan.maxLoanAmount}
                      onChange={(e) => setEditingLoan({ ...editingLoan, maxLoanAmount: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Short Description *</label>
                  <input
                    type="text"
                    required
                    value={editingLoan.shortDescription}
                    onChange={(e) => setEditingLoan({ ...editingLoan, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Processing Fee Description *</label>
                  <input
                    type="text"
                    required
                    value={editingLoan.processingFee}
                    onChange={(e) => setEditingLoan({ ...editingLoan, processingFee: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0A2540] text-white font-bold rounded-lg"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
