'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { 
  MessageSquare, 
  Home, 
  Briefcase, 
  Building, 
  Layers, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(resData => {
        if (resData.success) setData(resData);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats || {};
  const recentEnquiries = data?.recentEnquiries || [];
  const rateHistory = data?.rateHistory || [];

  return (
    <AdminLayout>
      <div className="space-y-8 pb-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0A2540]">Admin Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Overview of website loan information, enquiries, and interest rates
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/rates"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors shadow flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Update Interest Rates
            </Link>
          </div>
        </div>

        {/* 7 Required Admin Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Total Enquiries */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Enquiries</div>
              <div className="text-2xl font-extrabold text-[#0A2540] mt-1">{stats.totalEnquiries || 0}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: New Enquiries */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">New Enquiries</div>
              <div className="text-2xl font-extrabold text-green-600 mt-1">{stats.newEnquiries || 0}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Home Loan Enquiries */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Home Loan Enquiries</div>
              <div className="text-2xl font-extrabold text-[#0A2540] mt-1">{stats.homeLoanEnquiries || 0}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Home className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Business Loan Enquiries */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Business Loan Enquiries</div>
              <div className="text-2xl font-extrabold text-[#0A2540] mt-1">{stats.businessLoanEnquiries || 0}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          {/* Card 5: LAP Enquiries */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">LAP Enquiries</div>
              <div className="text-2xl font-extrabold text-[#0A2540] mt-1">{stats.lapEnquiries || 0}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
          </div>

          {/* Card 6: Active Loan Products */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Loan Products</div>
              <div className="text-2xl font-extrabold text-[#0A2540] mt-1">{stats.activeLoanProducts || 3}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          {/* Card 7: Last Rate Update */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between col-span-1 sm:col-span-2">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Rate Revision Date</div>
              <div className="text-xl font-extrabold text-blue-600 mt-1">{stats.lastRateUpdate || '2026-09-25'}</div>
              <div className="text-[11px] text-gray-500">Configured via Interest Rates Manager</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Recent Customer Enquiries Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-[#0A2540]">Recent Customer Enquiries</h2>
              <p className="text-xs text-gray-500">Submissions received via public website form</p>
            </div>
            <Link href="/admin/enquiries" className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
              View All Enquiries
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 font-semibold uppercase tracking-wider border-b border-gray-200">
                  <th className="py-3 px-4">Ref ID</th>
                  <th className="py-3 px-4">Applicant Name</th>
                  <th className="py-3 px-4">Phone / Email</th>
                  <th className="py-3 px-4">Loan Product</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentEnquiries.length > 0 ? (
                  recentEnquiries.map((enq: any) => (
                    <tr key={enq.id} className="hover:bg-gray-50/80">
                      <td className="py-3 px-4 font-bold text-[#0A2540]">{enq.enquiryNumber}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{enq.name} ({enq.city})</td>
                      <td className="py-3 px-4 text-gray-600">{enq.phone}</td>
                      <td className="py-3 px-4 font-semibold text-blue-700">{enq.loanType}</td>
                      <td className="py-3 px-4 font-bold">₹{enq.loanAmount.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          enq.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Link
                          href="/admin/enquiries"
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded font-semibold"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-400">
                      No customer enquiries logged yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
