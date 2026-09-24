'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  CheckCircle2, 
  FileText, 
  Percent, 
  Calendar, 
  ShieldCheck, 
  AlertCircle, 
  DollarSign, 
  Clock, 
  CheckSquare, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import EmiCalculatorComponent from '@/components/EmiCalculatorComponent';
import EnquiryFormModal from '@/components/EnquiryFormModal';

export default function HomeLoanPage() {
  const [loanData, setLoanData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/loans/home-loan')
      .then(res => res.json())
      .then(data => {
        if (data.success) setLoanData(data.data);
      })
      .catch(() => {});

    fetch('/api/documents?loanType=HOME_LOAN')
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

  const homeLoanOptions = [
    { title: 'Home Purchase Loan', desc: 'Finance the purchase of a new or pre-owned residential apartment, flat, or independent house.' },
    { title: 'Home Construction Loan', desc: 'Fund the step-by-step construction of a residential home on an already owned plot of land.' },
    { title: 'Home Improvement Loan', desc: 'Renovate, repair, expand, or modernize your existing residential house.' },
    { title: 'Composite Home Loan', desc: 'Combined financing for purchasing a residential plot and constructing a home within a designated timeframe.' },
    { title: 'Home Loan Balance Transfer', desc: 'Transfer your existing home loan to access competitive interest rate terms and potential top-up funds.' },
  ];

  const steps = [
    { step: 'Step 1', title: 'Enquiry', desc: 'Submit basic loan requirements online or speak with our representative.' },
    { step: 'Step 2', title: 'Eligibility Assessment', desc: 'Initial review of income, age, credit profile, and estimated borrowing capacity.' },
    { step: 'Step 3', title: 'Document Submission', desc: 'Provide identity, income, bank statement, and property title documents.' },
    { step: 'Step 4', title: 'Verification', desc: 'Verification of applicant details and technical valuation of the target property.' },
    { step: 'Step 5', title: 'Credit Assessment', desc: 'Detailed underwriting appraisal by the lender credit team.' },
    { step: 'Step 6', title: 'Sanction Decision', desc: 'Issuance of formal loan sanction letter detailing sanctioned amount and pricing.' },
    { step: 'Step 7', title: 'Documentation', desc: 'Execution of legal loan agreement and creation of mortgage security.' },
    { step: 'Step 8', title: 'Disbursement', desc: 'Disbursement of loan funds to seller or builder subject to applicable lender terms.' },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Header */}
      <section className="bg-[#0A2540] text-white py-12 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/60 rounded-full px-3 py-1 text-xs text-blue-200 font-medium">
                <Home className="w-3.5 h-3.5 text-blue-400" />
                <span>Residential Property Financing</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Home Loan
              </h1>
              <p className="text-base text-gray-300">
                Explore financing options for purchasing or constructing a residential property.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2"
              >
                Request Information / Apply
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section A: Overview */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-2xl font-bold text-[#0A2540] border-b border-gray-100 pb-3">
            What is a Home Loan?
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            A Home Loan is a secured financial solution provided by banks and financial institutions to help individuals buy, build, or renovate a residential house. The property being financed is held as security/collateral during the loan tenure until complete repayment of principal and interest.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Home loans offer long repayment tenures up to 30 years, enabling borrowers to manage their monthly budget through structured Equated Monthly Installments (EMIs).
          </p>
        </section>

        {/* Section B: Configurable Options */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#0A2540]">Home Loan Product Variants</h2>
            <span className="text-xs text-gray-500">Configurable Lender Options</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeLoanOptions.map((opt, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-[#0A2540]">{opt.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Loan Highlights (Dynamic Admin Data) */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Amount */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Loan Amount Limit</div>
            <div className="text-xl font-extrabold text-[#0A2540]">
              {formatCurrency(loanData?.minLoanAmount || 500000)} – {formatCurrency(loanData?.maxLoanAmount || 10000000)}
            </div>
            <div className="text-[11px] text-gray-500">Subject to income & LTV evaluation</div>
          </div>

          {/* Interest Rate */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Interest Rate</div>
            <div className="text-xl font-extrabold text-blue-600">
              Starting from {loanData?.startingInterestRate || '8.75'}% p.a.
            </div>
            <div className="text-[11px] text-gray-500">
              Range: {loanData?.minInterestRate || '8.75'}% – {loanData?.maxInterestRate || '11.50'}% ({loanData?.interestType || 'Floating'})
            </div>
          </div>

          {/* Tenure */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Repayment Tenure</div>
            <div className="text-xl font-extrabold text-[#0A2540]">
              {(loanData?.minTenure || 36) / 12} to {(loanData?.maxTenure || 360) / 12} Years
            </div>
            <div className="text-[11px] text-gray-500">Flexible EMI tenure options</div>
          </div>

          {/* Last Updated */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Rate Revision</div>
            <div className="text-xl font-extrabold text-gray-800">
              {loanData?.lastUpdated || '2026-09-25'}
            </div>
            <div className="text-[11px] text-gray-500">Admin verified rates</div>
          </div>
        </section>

        {/* Rate Disclaimer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-gray-700 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#0A2540]">Rate Information Disclosure: </span>
            Rates are subject to applicable product terms, borrower profile, lender policy and prevailing conditions. Final rates are determined by the lender.
          </div>
        </div>

        {/* Eligibility & Documents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Eligibility Criteria */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-[#0A2540] border-b border-gray-100 pb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              Eligibility Criteria
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
                  <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>Age: 21 to 65 years at loan maturity</span></li>
                  <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>Minimum Monthly Income: ₹25,000 for salaried applicants</span></li>
                  <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>Employment: Salaried with min 1 year stability or 2 years self-employed vintage</span></li>
                  <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>Credit Profile: Satisfactory repayment track record (CIBIL 700+)</span></li>
                </>
              )}
            </ul>
          </section>

          {/* Documents Required */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-[#0A2540] border-b border-gray-100 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Document Checklist
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
                  Identity Proof, Address Proof, PAN/Form 60, Salary Slips, Bank Statements, Property Chain Documents.
                </div>
              )}
            </div>
            <p className="text-[11px] text-gray-500 italic pt-1">
              "Exact documentation may vary based on applicant profile, property type and lender requirements."
            </p>
          </section>

        </div>

        {/* Fees & Charges */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-xl font-bold text-[#0A2540] border-b border-gray-100 pb-3">
            Applicable Fees & Charges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <div className="font-bold text-[#0A2540]">Processing Fee</div>
              <div className="text-gray-600">{loanData?.processingFee || '0.50% - 1.00% of loan amount + GST'}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <div className="font-bold text-[#0A2540]">Other Charges</div>
              <div className="text-gray-600">{loanData?.otherCharges || 'Legal & Technical appraisal charges at actuals'}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <div className="font-bold text-[#0A2540]">CERSAI Charges</div>
              <div className="text-gray-600">₹500 + applicable taxes</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <div className="font-bold text-[#0A2540]">Prepayment Charges</div>
              <div className="text-gray-600">NIL on floating rate home loans for individual borrowers</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <div className="font-bold text-[#0A2540]">Stamp Duty & Registration</div>
              <div className="text-gray-600">As per applicable state government regulations</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <div className="font-bold text-[#0A2540]">Late Payment Penalty</div>
              <div className="text-gray-600">Applicable penal interest per lender policy on delayed EMI</div>
            </div>
          </div>
        </section>

        {/* EMI Calculator */}
        <section>
          <EmiCalculatorComponent
            initialAmount={loanData?.minLoanAmount || 3000000}
            initialRate={loanData?.startingInterestRate || 8.75}
            initialTenureYears={20}
            title="Home Loan EMI Calculator"
          />
        </section>

        {/* Application Workflow Process */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-2xl font-bold text-[#0A2540]">Standard Loan Application Process</h2>
            <p className="text-xs text-gray-500 mt-0.5">8-step transparent workflow for assistance</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded">
                  {s.step}
                </span>
                <h4 className="text-sm font-bold text-[#0A2540]">{s.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold">Compliance Note: </span>
              Loan sanctioning and disbursement are strictly subject to complete document verification, property title validation, and final lender credit approval. Approval is never guaranteed.
            </div>
          </div>
        </section>

      </div>

      <EnquiryFormModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultLoanType="Home Loan"
      />
    </div>
  );
}
