'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { HelpCircle, Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);

  const loadFaqs = () => {
    setLoading(true);
    fetch('/api/admin/faqs')
      .then(res => res.json())
      .then(data => {
        if (data.success) setFaqs(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const openCreateModal = () => {
    setEditingFaq({
      question: '',
      answer: '',
      category: 'General',
      order: faqs.length + 1,
      status: 'ACTIVE'
    });
    setModalOpen(true);
  };

  const openEditModal = (faq: any) => {
    setEditingFaq({ ...faq });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = !!editingFaq.id;
      const url = isEdit ? `/api/admin/faqs/${editingFaq.id}` : '/api/admin/faqs';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq)
      });

      if (res.ok) {
        setModalOpen(false);
        loadFaqs();
      }
    } catch (err) {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
      if (res.ok) loadFaqs();
    } catch (err) {}
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0A2540]">FAQ Accordion Manager</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Add, reorder, edit or remove questions published on the public FAQ page
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" />
            Add New FAQ
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0A2540] text-white font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Question</th>
                  <th className="py-3 px-4">Answer Snippet</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {faqs.map(faq => (
                  <tr key={faq.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-[#0A2540]">#{faq.order}</td>
                    <td className="py-3 px-4 font-semibold text-blue-700">{faq.category}</td>
                    <td className="py-3 px-4 font-bold max-w-xs text-gray-900">{faq.question}</td>
                    <td className="py-3 px-4 text-gray-500 max-w-sm truncate">{faq.answer}</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded font-bold">
                        {faq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => openEditModal(faq)}
                        className="text-blue-600 font-semibold px-2 py-1 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="text-red-600 font-semibold px-2 py-1 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && editingFaq && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <h3 className="text-xl font-bold text-[#0A2540]">
                {editingFaq.id ? 'Edit FAQ' : 'Add FAQ'}
              </h3>

              <form onSubmit={handleSave} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Question *</label>
                  <input
                    type="text"
                    required
                    value={editingFaq.question}
                    onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Answer *</label>
                  <textarea
                    rows={4}
                    required
                    value={editingFaq.answer}
                    onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold block mb-1">Category *</label>
                    <select
                      value={editingFaq.category}
                      onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    >
                      <option value="General">General</option>
                      <option value="Home Loan">Home Loan</option>
                      <option value="Business Loan">Business Loan</option>
                      <option value="Loan Against Property">Loan Against Property</option>
                      <option value="EMI & Rates">EMI & Rates</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Display Order *</label>
                    <input
                      type="number"
                      value={editingFaq.order}
                      onChange={(e) => setEditingFaq({ ...editingFaq, order: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-[#0A2540] text-white font-bold rounded-lg">Save FAQ</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
