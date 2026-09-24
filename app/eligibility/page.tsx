'use client';

import React from 'react';
import { 
  CheckCircle2, 
  ShieldAlert, 
  UserCheck, 
  Briefcase, 
  CreditCard, 
  Building, 
  Scale, 
  Clock 
} from 'lucide-react';
import EligibilityEstimatorComponent from '@/components/EligibilityEstimatorComponent';

export default function EligibilityPage() {
  const eligibilitySections = [
    { title: '1. Age Requirements', icon: Clock, desc: 'Salaried applicants: 21 to 60 years at loan maturity. Self-employed applicants: 23 to 65 years at maturity.' },
    { title: '2. Income Guidelines', icon: UserCheck, desc: 'Salaried: Net monthly income of ₹25,000+. Self-employed: Annual turnover of ₹15 Lakhs+ backed by audited financials.' },
    { title: '3. Employment & Vintage', icon: Briefcase, desc: 'Minimum 1 year stability in current organization for salaried; minimum 2-3 years continuous business activity for self-employed.' },
    { title: '4. Business Profile', icon: Building, desc: 'Legally registered business entity (Proprietorship, Partnership, CA/Doctor practice, Private Limited) with valid GST / Udyam proof.' },
    { title: '5. Credit History (CIBIL)', icon: CreditCard, desc: 'Satisfactory credit score (CIBIL 700+ preferred) demonstrating disciplined past loan and credit card repayment behavior.' },
    { title: '6. Existing Obligations (FOIR)', icon: Scale, desc: 'Fixed Obligation to Income Ratio (FOIR). Existing EMIs and proposed loan EMI combined should generally not exceed 50-60% of net income.' },
    { title: '7. Repayment Capacity', icon: CheckCircle2, desc: 'Evaluated based on net monthly disposable income, banking transactions, savings history, and secondary co-applicant income.' },
    { title: '8. Property Criteria', icon: Building, desc: 'For Home Loans and LAP: Clear & marketable property title, approved municipal layout plans, and positive technical valuation report.' },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Banner */}
      <section className="bg-[#0A2540] text-white py-12 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/60 rounded-full px-3 py-1 text-xs text-blue-200 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Borrower Assessment Guidelines</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Loan Eligibility Guidelines & Estimator
            </h1>
            <p className="text-base text-gray-300">
              Understand key parameters evaluated by lenders during loan underwriting and estimate your borrowing capacity.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Interactive Estimator Component */}
        <section>
          <EligibilityEstimatorComponent />
        </section>

        {/* 8 Key Eligibility Criteria Grid */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-2xl font-bold text-[#0A2540]">Key Underwriting Criteria</h2>
            <p className="text-xs text-gray-500 mt-0.5">Factors impacting loan eligibility assessment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eligibilitySections.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0A2540]">{sec.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{sec.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mandatory Non-Guaranteed Disclaimer Box */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 text-xs text-amber-950 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-900 mb-1">Eligibility Assessment Disclosure</div>
            "Estimated eligibility based on the information provided. Final eligibility is subject to lender assessment, verification and applicable policy."
          </div>
        </div>

      </div>
    </div>
  );
}
