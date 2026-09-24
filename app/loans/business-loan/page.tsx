'use client';

import React, { useEffect, useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  FileText, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  Building2,
  Boxes,
  Wrench,
  ShieldCheck
} from 'lucide-react';
import EmiCalculatorComponent from '@/components/EmiCalculatorComponent';
import EnquiryFormModal from '@/components/EnquiryFormModal';

export default function BusinessLoanPage() {
  const [loanData, setLoanData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/loans/business-loan')
      .then(res => res.json())
      .then(data => {
        if (data.success) setLoanData(data.data);
      })
      .catch(() => {});

    fetch('/api/documents?loanType=BUSINESS_LOAN')
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

  const businessPurposes = [
    { title: 'Working Capital', icon: TrendingUp, desc: 'Maintain regular cash flow, manage daily operational overheads, and pay supplier bills.' },
    { title: 'Business Expansion', icon: Building2, desc: 'Open new retail outlets, expand office footprint, or enter new geographical markets.' },
    { title: 'Stock & Raw Material Purchase', icon: Boxes, desc: 'Procure bulk inventory ahead of peak commercial seasons to maximize profit margins.' },
    { title: 'Machinery & Equipment Upgrade', icon: Wrench, desc: 'Invest in commercial tools, technology upgrades, or heavy machinery to boost capacity.' },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Header */}
      <section className="bg-[#0A2540] text-white py-12 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/60 rounded-full px-3 py-1 text-xs text-blue-200 font-medium">
                <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                <span>Commercial & Enterprise Financing</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Business Loan
              </h1>
              <p className="text-base text-gray-300">
                Explore financing solutions designed for eligible businesses and entrepreneurs.
              </p>
            </div>

            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2 self-start md:self-center"
            >
              Enquire for Business Loan
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Overview */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-2xl font-bold text-[#0A2540] border-b border-gray-100 pb-3">
            Business Loan Overview
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            A Business Loan provides liquidity and funding support to self-employed individuals, micro, small, and medium enterprises (MSMEs), partnership firms, and corporate entities. Whether managing seasonal inventory spikes or funding long-term expansion, business financing options assist eligible entities with structured loan tenure.
          </p>
        </section>

        {/* Permitted Business Purposes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#0A2540]">Permitted Business Purposes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessPurposes.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0A2540]">{p.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
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
              {formatCurrency(loanData?.minLoanAmount || 200000)} – {formatCurrency(loanData?.maxLoanAmount || 5000000)}
            </div>
            <div className="text-[11px] text-gray-500">Based on turnover & banking</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Interest Rate</div>
            <div className="text-xl font-extrabold text-blue-600">
              Starting from {loanData?.startingInterestRate || '12.50'}% p.a.
            </div>
            <div className="text-[11px] text-gray-500">
              Range: {loanData?.minInterestRate || '12.50'}% – {loanData?.maxInterestRate || '18.00'}% ({loanData?.interestType || 'Fixed'})
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Loan Tenure</div>
            <div className="text-xl font-extrabold text-[#0A2540]">
              {(loanData?.minTenure || 12)} to {(loanData?.maxTenure || 60)} Months
            </div>
            <div className="text-[11px] text-gray-500">1 to 5 years repayment</div>
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
              Business Eligibility Criteria
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
                  <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>Business Vintage: Minimum 2 to 3 years of active continuous operations</span></li>
                  <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>Annual Turnover: Minimum ₹15 Lakhs recorded in audited returns</span></li>
                  <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>Banking History: Satisfactory current account credit turnover</span></li>
                  <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>Credit History: Good promoter CIBIL rating without severe defaults</span></li>
                </>
              )}
            </ul>
          </section>

          {/* Document Requirements (Configurable Notice) */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-[#0A2540] border-b border-gray-100 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Configurable Document Checklist
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
                  PAN, GST Registration, Business Bank Statements (12 months), Audited Financials, Partnership Deed / MOA.
                </div>
              )}
            </div>
            <p className="text-[11px] text-gray-500 italic pt-1">
              "Document requirements are configurable. Do not assume every applicant requires every document."
            </p>
          </section>

        </div>

        {/* Fees */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-xl font-bold text-[#0A2540] border-b border-gray-100 pb-3">
            Fees & Operational Charges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <div className="font-bold text-[#0A2540]">Processing Fee</div>
              <div className="text-gray-600">{loanData?.processingFee || '1.50% - 2.50% of loan amount + taxes'}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <div className="font-bold text-[#0A2540]">Documentation & Stamp Duty</div>
              <div className="text-gray-600">At actuals as per state legal rules</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <div className="font-bold text-[#0A2540]">Cheque / NACH Bounce</div>
              <div className="text-gray-600">Standard penalty fee per dishonoered ECS / NACH debit</div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-gray-700 flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Charges may vary according to product, loan amount, borrower profile and applicable lender policy.</span>
          </div>
        </section>

        {/* EMI Calculator */}
        <section>
          <EmiCalculatorComponent
            initialAmount={loanData?.minLoanAmount || 1500000}
            initialRate={loanData?.startingInterestRate || 12.50}
            initialTenureYears={3}
            title="Business Loan EMI Calculator"
          />
        </section>

      </div>

      <EnquiryFormModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultLoanType="Business Loan"
      />
    </div>
  );
}
