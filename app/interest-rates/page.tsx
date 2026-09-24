'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Percent, 
  RefreshCw, 
  ShieldAlert, 
  Info, 
  ArrowRight,
  CheckCircle2,
  Calendar,
  FileText
} from 'lucide-react';
import EnquiryFormModal from '@/components/EnquiryFormModal';

export default function InterestRatesPage() {
  const [ratesData, setRatesData] = useState<any[]>([]);
  const [disclaimer, setDisclaimer] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(true);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState('Home Loan');

  useEffect(() => {
    fetch('/api/rates')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRatesData(data.data);
          setDisclaimer(data.disclaimer);
          setLastUpdated(data.lastUpdated);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openEnquiry = (loanName: string) => {
    setSelectedLoan(loanName);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-[#0A2540] text-white py-12 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/60 rounded-full px-3 py-1 text-xs text-blue-200 font-medium">
              <Percent className="w-3.5 h-3.5 text-blue-400" />
              <span>Transparent Rate Comparison</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Applicable Loan Interest Rates & Charges
            </h1>
            <p className="text-base text-gray-300">
              View current indicative interest rates, tenure ranges, and pricing structures across loan categories.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Comparison Table Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#0A2540]">Loan Products Interest Rate Matrix</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                All values are configurable from the Admin Panel and updated in real-time
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 font-medium shrink-0">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Last Revised: <strong className="text-[#0A2540]">{lastUpdated || '2026-09-25'}</strong></span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0A2540] text-white text-xs font-semibold uppercase tracking-wider">
                  <th className="py-4 px-6">Loan Product</th>
                  <th className="py-4 px-6">Starting Rate</th>
                  <th className="py-4 px-6">Indicative Rate Range</th>
                  <th className="py-4 px-6">Rate Type</th>
                  <th className="py-4 px-6">Tenure Range</th>
                  <th className="py-4 px-6">Processing Fee</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      Loading interest rates...
                    </td>
                  </tr>
                ) : ratesData.length > 0 ? (
                  ratesData.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#0A2540]">
                        <Link href={`/loans/${item.slug}`} className="hover:text-blue-600 underline">
                          {item.loanName}
                        </Link>
                      </td>
                      <td className="py-4 px-6 font-extrabold text-blue-600">
                        {item.startingRate}% p.a.
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-700">
                        {item.minRate}% – {item.maxRate}% p.a.
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.rateType === 'Floating' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {item.rateType}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-600">
                        Up to {item.slug === 'home-loan' ? '30 Years' : item.slug === 'business-loan' ? '5 Years' : '15 Years'}
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-600 max-w-xs">
                        {item.processingFee}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openEnquiry(item.loanName)}
                          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors shadow-sm"
                        >
                          Enquire
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      No interest rates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
            <span>Note: Rate types and pricing tiers are configured directly via the Admin Panel.</span>
            <span className="font-semibold text-gray-700">Admin Rates Control Active</span>
          </div>

        </div>

        {/* Mandatory Disclaimer Box */}
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 text-xs text-amber-950 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-900 mb-1">Interest Rate Disclaimer</div>
            "Interest rates shown are indicative/configurable information and may vary based on product, borrower profile, credit assessment, lender policy and prevailing terms. Final pricing is determined by the applicable lender."
          </div>
        </div>

      </div>

      <EnquiryFormModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultLoanType={selectedLoan}
      />
    </div>
  );
}
