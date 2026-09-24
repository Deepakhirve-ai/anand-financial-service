'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Briefcase, 
  Building, 
  ArrowRight, 
  ShieldCheck, 
  Info, 
  FileCheck2, 
  HelpCircle,
  Percent,
  Calculator,
  CheckCircle2
} from 'lucide-react';
import EmiCalculatorComponent from '@/components/EmiCalculatorComponent';
import EnquiryFormModal from '@/components/EnquiryFormModal';

export default function HomePage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState('Home Loan');

  useEffect(() => {
    fetch('/api/loans')
      .then(res => res.json())
      .then(data => {
        if (data.success) setLoans(data.data);
      })
      .catch(() => {});

    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success) setSettings(data.data);
      })
      .catch(() => {});
  }, []);

  const openEnquiry = (loanName: string) => {
    setSelectedLoan(loanName);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Premium Hero Section */}
      <section className="relative bg-[#0A2540] text-white pt-12 pb-20 overflow-hidden border-b border-blue-900/60">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Compliance Pill */}
              <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/60 rounded-full px-3.5 py-1 text-xs text-blue-200 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Anand Financial Service • Transparent Loan Assistance</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Find the Right Loan for Your Financial Goals
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl font-normal">
                Explore Home Loans, Business Loans and Loan Against Property solutions with clear information about eligibility, interest rates, documents, repayment and applicable charges.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="#product-cards"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-sm sm:text-base"
                >
                  Explore Loans
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#emi-calculator"
                  className="bg-blue-950/70 hover:bg-blue-900 text-blue-100 border border-blue-700/70 font-semibold px-6 py-3.5 rounded-xl transition-all text-sm sm:text-base flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-blue-300" />
                  Calculate EMI
                </Link>
              </div>

              {/* Relationship Banner */}
              <div className="bg-blue-950/80 border border-blue-800/80 rounded-xl p-4 text-xs text-blue-200 leading-relaxed mt-4 max-w-2xl">
                <div className="font-semibold text-white mb-0.5">Authorised Information Partner Notice</div>
                "Anand Financial Service provides loan information and assistance for eligible customers."
              </div>

            </div>

            {/* Right Column Visual Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-gradient-to-br from-blue-900/60 to-blue-950/90 border border-blue-800 rounded-3xl p-6 shadow-2xl backdrop-blur-sm space-y-5">
                
                <div className="flex items-center justify-between pb-3 border-b border-blue-800/80">
                  <div className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                    Loan Solutions Overview
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
                </div>

                {/* Card 1 */}
                <div className="bg-white/10 p-3.5 rounded-xl flex items-center justify-between backdrop-blur-md hover:bg-white/15 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Home Loans</div>
                      <div className="text-[11px] text-blue-200">From 8.75% p.a. • Up to 30 Yrs</div>
                    </div>
                  </div>
                  <button
                    onClick={() => openEnquiry('Home Loan')}
                    className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md font-semibold"
                  >
                    Enquire
                  </button>
                </div>

                {/* Card 2 */}
                <div className="bg-white/10 p-3.5 rounded-xl flex items-center justify-between backdrop-blur-md hover:bg-white/15 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Business Loans</div>
                      <div className="text-[11px] text-blue-200">From 12.50% p.a. • Working Capital</div>
                    </div>
                  </div>
                  <button
                    onClick={() => openEnquiry('Business Loan')}
                    className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md font-semibold"
                  >
                    Enquire
                  </button>
                </div>

                {/* Card 3 */}
                <div className="bg-white/10 p-3.5 rounded-xl flex items-center justify-between backdrop-blur-md hover:bg-white/15 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Loan Against Property</div>
                      <div className="text-[11px] text-blue-200">From 9.75% p.a. • Higher Sanctions</div>
                    </div>
                  </div>
                  <button
                    onClick={() => openEnquiry('Loan Against Property')}
                    className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md font-semibold"
                  >
                    Enquire
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-blue-300 italic">
                    Rates are indicative & configurable from Admin Panel
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Product Cards Section */}
      <section id="product-cards" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Core Offerings
          </div>
          <h2 className="text-3xl font-extrabold text-[#0A2540] tracking-tight">
            Explore Our Loan Products
          </h2>
          <p className="text-sm text-gray-600">
            Compare key loan parameters, required documentation, and eligibility guidelines to choose the solution best aligned with your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Home Loan */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-[#0A2540] group-hover:text-white transition-colors">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540]">HOME LOAN</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                "Finance your dream home with suitable home financing options."
              </p>
              <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1.5 text-gray-700">
                <div className="flex justify-between">
                  <span>Starting Rate:</span>
                  <span className="font-bold text-[#0A2540]">
                    {loans.find(l => l.slug === 'home-loan')?.startingInterestRate || '8.75'}% p.a.
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tenure:</span>
                  <span className="font-medium">Up to 30 Years</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Amount:</span>
                  <span className="font-medium">Up to ₹1 Crore+</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/loans/home-loan"
                className="w-full bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Business Loan */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-[#0A2540] group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540]">BUSINESS LOAN</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                "Explore financing solutions for business growth, working capital and expansion."
              </p>
              <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1.5 text-gray-700">
                <div className="flex justify-between">
                  <span>Starting Rate:</span>
                  <span className="font-bold text-[#0A2540]">
                    {loans.find(l => l.slug === 'business-loan')?.startingInterestRate || '12.50'}% p.a.
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tenure:</span>
                  <span className="font-medium">12 to 60 Months</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Amount:</span>
                  <span className="font-medium">Up to ₹50 Lakhs</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/loans/business-loan"
                className="w-full bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Loan Against Property */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-[#0A2540] group-hover:text-white transition-colors">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540]">LOAN AGAINST PROPERTY</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                "Explore secured financing against eligible residential or commercial property."
              </p>
              <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1.5 text-gray-700">
                <div className="flex justify-between">
                  <span>Starting Rate:</span>
                  <span className="font-bold text-[#0A2540]">
                    {loans.find(l => l.slug === 'loan-against-property')?.startingInterestRate || '9.75'}% p.a.
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tenure:</span>
                  <span className="font-medium">Up to 15 Years</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Amount:</span>
                  <span className="font-medium">Up to ₹1.5 Crore+</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/loans/loan-against-property"
                className="w-full bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Trust & Information Principles Section (4 Cards) */}
      <section className="bg-gradient-to-b from-gray-50 to-blue-50/40 py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Our Service Commitment
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540]">
              Transparent Information & Professional Assistance
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              We provide accurate loan specifications to help borrowers evaluate their choices objectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">
                <Info className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#0A2540] mb-1">Clear Information</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Understand loan rates, eligibility, documents and charges without hidden surprises.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#0A2540] mb-1">Professional Assistance</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Get step-by-step assistance in understanding loan requirements and documentation.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#0A2540] mb-1">Transparent Process</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Important loan information and lender fee structures are presented clearly up front.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#0A2540] mb-1">Informed Decisions</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Compare applicable terms, repayment schedules, and understand your financial obligations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* EMI Calculator Preview Section */}
      <section id="emi-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <EmiCalculatorComponent title="Calculate Your Estimated Monthly EMI" />
      </section>

      {/* Modal for Enquiry */}
      <EnquiryFormModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultLoanType={selectedLoan}
      />
    </div>
  );
}
