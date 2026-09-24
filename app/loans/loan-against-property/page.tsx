'use client';

import React, { useEffect, useState } from 'react';
import { 
  Building, 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  ArrowRight,
  Home,
  Store,
  Warehouse,
  ShieldAlert,
  AlertCircle
} from 'lucide-react';
import EmiCalculatorComponent from '@/components/EmiCalculatorComponent';
import EnquiryFormModal from '@/components/EnquiryFormModal';

export default function LoanAgainstPropertyPage() {
  const [loanData, setLoanData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/loans/loan-against-property')
      .then(res => res.json())
      .then(data => {
        if (data.success) setLoanData(data.data);
      })
      .catch(() => {});

    fetch('/api/documents?loanType=LOAN_AGAINST_PROPERTY')
      .then(res => res.json())
      .then(data => {
        if (data.success) setDocuments(data.data);
      })
      .catch(() => {});
  }, []);

  const formatCurrency = (val: number) => {
    if (!val) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const propertyTypes = [
    { title: 'Residential Property', icon: Home, desc: 'Self-occupied or rented residential house, flat, or bungalow with clear title.' },
    { title: 'Commercial Property', icon: Store, desc: 'Approved commercial office spaces, shops, or commercial buildings.' },
    { title: 'Industrial Property', icon: Warehouse, desc: 'Eligible industrial plots or factories meeting lender collateral parameters.' },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Header */}
      <section className="bg-[#0A2540] text-white py-12 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/60 rounded-full px-3 py-1 text-xs text-blue-200 font-medium">
                <Building className="w-3.5 h-3.5 text-blue-400" />
                <span>Secured Collateral Mortgage Financing</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Loan Against Property (LAP)
              </h1>
              <p className="text-base text-gray-300">
                Explore secured financing options against eligible residential or commercial property.
              </p>
            </div>

            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2 self-start md:self-center"
            >
              Enquire for LAP
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Prominent Warning Banner */}
        <div className="bg-amber-50 border-2 border-amber-400/80 rounded-2xl p-5 shadow-sm text-amber-950 flex items-start gap-3.5">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-sm sm:text-base text-amber-900">
              Important Collateral Warning
            </div>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-medium">
              "Property-backed loans involve collateral. Failure to meet repayment obligations may have consequences according to the applicable loan agreement."
            </p>
          </div>
        </div>

        {/* Overview */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-2xl font-bold text-[#0A2540] border-b border-gray-100 pb-3">
            What is a Loan Against Property?
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            A Loan Against Property (LAP) is a secured loan where an eligible residential or commercial property owned by the borrower is mortgaged as collateral security to secure loan funds. Because the loan is backed by tangible real estate assets, lenders typically offer higher loan amounts and lower interest rates compared to uncollateralized personal or business loans.
          </p>
        </section>

        {/* Property Categories */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#0A2540]">Eligible Property Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {propertyTypes.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0A2540]">{pt.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{pt.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Admin Dynamic Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Loan Amount</div>
            <div className="text-xl font-extrabold text-[#0A2540]">
              {formatCurrency(loanData?.minLoanAmount || 500000)} – {formatCurrency(loanData?.maxLoanAmount || 15000000)}
            </div>
            <div className="text-[11px] text-gray-500">Based on LTV (up to 60-70% property value)</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Interest Rate</div>
            <div className="text-xl font-extrabold text-blue-600">
              Starting from {loanData?.startingInterestRate || '9.75'}% p.a.
            </div>
            <div className="text-[11px] text-gray-500">
              Range: {loanData?.minInterestRate || '9.75'}% – {loanData?.maxInterestRate || '13.50'}% ({loanData?.interestType || 'Floating'})
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Loan Tenure</div>
            <div className="text-xl font-extrabold text-[#0A2540]">
              {(loanData?.minTenure || 24) / 12} to {(loanData?.maxTenure || 180) / 12} Years
            </div>
            <div className="text-[11px] text-gray-500">Up to 15 years repayment</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Rate Revision</div>
            <div className="text-xl font-extrabold text-gray-800">
              {loanData?.lastUpdated || '2026-09-25'}
            </div>
            <div className="text-[11px] text-gray-500">Admin verified parameters</div>
          </div>
        </section>

        {/* Eligibility & Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-[#0A2540] border-b border-gray-100 pb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              LAP Eligibility Criteria
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
              {loanData?.eligibility ? (
                loanData.eligibility.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>Applicant: Salaried employees, self-employed business owners, or firms</span></li>
                  <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>Property Ownership: Clear & marketable title deed of residential or commercial property</span></li>
                  <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>Valuation: Property valuation and technical inspection conducted by empanelled valuer</span></li>
                  <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>Repayment Capacity: Net income sufficient to service existing and proposed EMI obligations</span></li>
                </>
              )}
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-[#0A2540] border-b border-gray-100 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Required Document Checklist
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              {documents.length > 0 ? (
                documents.map((doc, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-50 rounded-lg flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-[#0A2540]">{doc.documentName}</div>
                      <div className="text-[11px] text-gray-500">{doc.description}</div>
                    </div>
                    {doc.mandatory && (
                      <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold shrink-0">
                        Mandatory
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-500">
                  PAN/Aadhaar, Bank Statements, ITR, Registered Property Sale Deed, Tax Receipts.
                </div>
              )}
            </div>
            <p className="text-[11px] text-gray-500 italic pt-1">
              "Property chain documentation and legal title search report are verified prior to sanction."
            </p>
          </section>

        </div>

        {/* EMI Calculator */}
        <section>
          <EmiCalculatorComponent
            initialAmount={loanData?.minLoanAmount || 5000000}
            initialRate={loanData?.startingInterestRate || 9.75}
            initialTenureYears={10}
            title="Loan Against Property EMI Calculator"
          />
        </section>

      </div>

      <EnquiryFormModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultLoanType="Loan Against Property"
      />
    </div>
  );
}
