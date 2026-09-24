'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { MessageSquare, Search, Filter, Trash2, Edit3, X, CheckCircle2 } from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [statusInput, setStatusInput] = useState('New');
  const [adminNotesInput, setAdminNotesInput] = useState('');

  const loadEnquiries = () => {
    setLoading(true);
    fetch('/api/admin/enquiries')
      .then(res => res.json())
      .then(data => {
        if (data.success) setEnquiries(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const openManageModal = (enq: any) => {
    setSelectedEnquiry(enq);
    setStatusInput(enq.status);
    setAdminNotesInput(enq.adminNotes || '');
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: statusInput,
          adminNotes: adminNotesInput
        })
      });

      if (res.ok) {
        setSelectedEnquiry(null);
        loadEnquiries();
      }
    } catch (err) {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) loadEnquiries();
    } catch (err) {}
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesStatus = filterStatus === 'ALL' || e.status === filterStatus;
    const matchesSearch =
      e.enquiryNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      e.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.loanType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statuses = ['ALL', 'New', 'Contacted', 'Follow Up', 'Interested', 'Not Interested', 'Converted', 'Closed'];

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-extrabold text-[#0A2540]">Customer Enquiry Manager</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Review submissions, track follow-up statuses, and manage customer loan requests
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by Ref ID, Name, Phone, City..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {statuses.map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  filterStatus === st
                    ? 'bg-[#0A2540] text-white border-[#0A2540]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0A2540] text-white font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Enquiry ID</th>
                  <th className="py-3 px-4">Applicant Name</th>
                  <th className="py-3 px-4">Contact Phone / Email</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Loan Type</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEnquiries.length > 0 ? (
                  filteredEnquiries.map(enq => (
                    <tr key={enq.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-[#0A2540]">{enq.enquiryNumber}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">{enq.name}</td>
                      <td className="py-3 px-4 text-gray-600">
                        <div>{enq.phone}</div>
                        <div className="text-[10px] text-gray-400">{enq.email}</div>
                      </td>
                      <td className="py-3 px-4 font-medium">{enq.city}</td>
                      <td className="py-3 px-4 font-bold text-blue-700">{enq.loanType}</td>
                      <td className="py-3 px-4 font-extrabold">₹{enq.loanAmount.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4 text-[11px] text-gray-500">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          enq.status === 'New' ? 'bg-green-100 text-green-800' :
                          enq.status === 'Converted' ? 'bg-purple-100 text-purple-800' :
                          enq.status === 'Closed' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => openManageModal(enq)}
                          className="bg-blue-600 text-white font-semibold px-3 py-1 rounded hover:bg-blue-500 transition-colors mr-1"
                        >
                          Manage
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="text-red-600 font-semibold px-2 py-1 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-gray-400">
                      No customer enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Update Modal */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-lg font-bold text-[#0A2540]">
                  Manage Enquiry: {selectedEnquiry.enquiryNumber}
                </h3>
                <button onClick={() => setSelectedEnquiry(null)}>
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl text-xs space-y-1 text-gray-700">
                <div><strong>Name:</strong> {selectedEnquiry.name} ({selectedEnquiry.city})</div>
                <div><strong>Contact:</strong> {selectedEnquiry.phone} | {selectedEnquiry.email}</div>
                <div><strong>Loan Required:</strong> {selectedEnquiry.loanType} - ₹{selectedEnquiry.loanAmount.toLocaleString('en-IN')}</div>
                <div><strong>Employment / Income:</strong> {selectedEnquiry.employmentType} (₹{selectedEnquiry.monthlyIncome?.toLocaleString('en-IN') || 0}/mo)</div>
                {selectedEnquiry.message && <div><strong>Applicant Message:</strong> "{selectedEnquiry.message}"</div>}
              </div>

              <form onSubmit={handleUpdateStatus} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Update Status *</label>
                  <select
                    value={statusInput}
                    onChange={(e) => setStatusInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white font-bold"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Interested">Interested</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Admin Follow-Up Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Enter internal notes, customer call feedback..."
                    value={adminNotesInput}
                    onChange={(e) => setAdminNotesInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setSelectedEnquiry(null)} className="px-4 py-2 border rounded-lg">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-[#0A2540] text-white font-bold rounded-lg">Update Record</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
