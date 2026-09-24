'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FileText, Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any | null>(null);

  const loadDocs = () => {
    setLoading(true);
    fetch('/api/admin/documents')
      .then(res => res.json())
      .then(data => {
        if (data.success) setDocs(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const openCreateModal = () => {
    setEditingDoc({
      loanType: 'ALL',
      category: 'Identity',
      documentName: '',
      description: '',
      mandatory: true,
      status: 'ACTIVE'
    });
    setModalOpen(true);
  };

  const openEditModal = (doc: any) => {
    setEditingDoc({ ...doc });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = !!editingDoc.id;
      const url = isEdit ? `/api/admin/documents/${editingDoc.id}` : '/api/admin/documents';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDoc)
      });

      if (res.ok) {
        setModalOpen(false);
        loadDocs();
      }
    } catch (err) {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document requirement?')) return;
    try {
      const res = await fetch(`/api/admin/documents/${id}`, { method: 'DELETE' });
      if (res.ok) loadDocs();
    } catch (err) {}
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0A2540]">Document Checklist Manager</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Add, edit, or categorize mandatory and optional documents for loan products
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" />
            Add Document Item
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0A2540] text-white font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Document Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Loan Type</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Mandatory</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {docs.map(doc => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-[#0A2540]">{doc.documentName}</td>
                    <td className="py-3 px-4 font-semibold text-blue-700">{doc.category}</td>
                    <td className="py-3 px-4">{doc.loanType}</td>
                    <td className="py-3 px-4 text-gray-600 max-w-xs">{doc.description}</td>
                    <td className="py-3 px-4">
                      {doc.mandatory ? (
                        <span className="bg-red-100 text-red-800 text-[10px] px-2 py-0.5 rounded font-bold">Mandatory</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded">Optional</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => openEditModal(doc)}
                        className="text-blue-600 font-semibold px-2 py-1 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
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
        {modalOpen && editingDoc && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <h3 className="text-xl font-bold text-[#0A2540]">
                {editingDoc.id ? 'Edit Document Item' : 'Add Document Item'}
              </h3>

              <form onSubmit={handleSave} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Document Name *</label>
                  <input
                    type="text"
                    required
                    value={editingDoc.documentName}
                    onChange={(e) => setEditingDoc({ ...editingDoc, documentName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold block mb-1">Category *</label>
                    <select
                      value={editingDoc.category}
                      onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    >
                      <option value="Identity">Identity</option>
                      <option value="Address">Address</option>
                      <option value="Income">Income</option>
                      <option value="Employment">Employment</option>
                      <option value="Business">Business</option>
                      <option value="Property">Property</option>
                      <option value="Banking">Banking</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Applies To *</label>
                    <select
                      value={editingDoc.loanType}
                      onChange={(e) => setEditingDoc({ ...editingDoc, loanType: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    >
                      <option value="ALL">All Loans</option>
                      <option value="HOME_LOAN">Home Loan</option>
                      <option value="BUSINESS_LOAN">Business Loan</option>
                      <option value="LOAN_AGAINST_PROPERTY">Loan Against Property</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Description</label>
                  <input
                    type="text"
                    value={editingDoc.description}
                    onChange={(e) => setEditingDoc({ ...editingDoc, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="mandatory"
                    checked={editingDoc.mandatory}
                    onChange={(e) => setEditingDoc({ ...editingDoc, mandatory: e.target.checked })}
                  />
                  <label htmlFor="mandatory" className="font-semibold">Mark as Mandatory Document</label>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-[#0A2540] text-white font-bold rounded-lg">Save Document</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
