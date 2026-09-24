'use client';

import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Info, 
  Building2,
  AlertCircle,
  CheckSquare
} from 'lucide-react';
import EnquiryFormModal from '@/components/EnquiryFormModal';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/documents')
      .then(res => res.json())
      .then(data => {
        if (data.success) setDocuments(data.data);
      })
      .catch(() => {});
  }, []);

  const categories = [
    { name: 'ALL', label: 'All Categories' },
    { name: 'Identity', label: '1. Identity Documents' },
    { name: 'Address', label: '2. Address Documents' },
    { name: 'Income', label: '3. Income Documents' },
    { name: 'Employment', label: '4. Employment Documents' },
    { name: 'Business', label: '5. Business Documents' },
    { name: 'Banking', label: '6. Banking Documents' },
    { name: 'Property', label: '7. Property Documents' },
    { name: 'Other', label: '8. Other Documents' },
  ];

  const filteredDocs = selectedCategory === 'ALL'
    ? documents
    : documents.filter(d => d.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-12 pb-16">
      
      {/* Banner */}
      <section className="bg-[#0A2540] text-white py-12 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/60 rounded-full px-3 py-1 text-xs text-blue-200 font-medium">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Standard Checklist & Verification Guidelines</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Documents Required for Loan Assistance
            </h1>
            <p className="text-base text-gray-300">
              Category-based checklist of identity, address, income, banking, business, and property documents.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pb-2">
          {categories.map(c => (
            <button
              key={c.name}
              onClick={() => setSelectedCategory(c.name)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                selectedCategory === c.name
                  ? 'bg-[#0A2540] text-white border-[#0A2540]'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Documents Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc, idx) => (
              <div
                key={doc.id || idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">
                      {doc.category}
                    </span>
                    {doc.mandatory ? (
                      <span className="text-[10px] font-bold bg-red-50 text-red-700 px-2 py-0.5 rounded">
                        Mandatory
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Optional / If Applicable</span>
                    )}
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckSquare className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-bold text-[#0A2540]">{doc.documentName}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed mt-1">{doc.description}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4 text-[11px] text-gray-400 flex items-center justify-between">
                  <span>Applies to: {doc.loanType === 'ALL' ? 'All Loan Products' : doc.loanType}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              No document requirements found for the selected category.
            </div>
          )}
        </div>

        {/* Standard Verification Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-xs text-gray-700 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-[#0A2540]">Important Documentation Notice</div>
            <p>
              "Document requirements vary by loan product, applicant profile and lender policy. Please confirm the latest requirements before submission."
            </p>
          </div>
        </div>

      </div>

      <EnquiryFormModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultLoanType="Home Loan"
      />
    </div>
  );
}
