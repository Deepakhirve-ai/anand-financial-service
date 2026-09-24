'use client';

import React from 'react';
import { Calculator, AlertCircle, Info } from 'lucide-react';
import EmiCalculatorComponent from '@/components/EmiCalculatorComponent';

export default function EmiCalculatorPage() {
  return (
    <div className="space-y-12 pb-16">
      
      {/* Banner */}
      <section className="bg-[#0A2540] text-white py-12 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/60 rounded-full px-3 py-1 text-xs text-blue-200 font-medium">
              <Calculator className="w-3.5 h-3.5 text-blue-400" />
              <span>Financial Planning & Repayment Estimation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Financial EMI Calculator
            </h1>
            <p className="text-base text-gray-300">
              Calculate Equated Monthly Installments (EMIs), interest component, and principal breakdown for Home, Business, or LAP loans.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Full Component */}
        <EmiCalculatorComponent title="Loan EMI Repayment Calculator" />

        {/* Informational Guidance */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-xl font-bold text-[#0A2540] border-b border-gray-100 pb-3">
            Understanding How EMI is Calculated
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            EMI (Equated Monthly Installment) consists of two components: the principal loan amount and the interest charged by the lender. In the initial years of repayment, a higher portion of your monthly EMI goes towards interest repayment. As the loan matures, a larger portion reduces the principal balance.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs font-mono text-gray-800 space-y-1">
            <div className="font-bold text-[#0A2540] font-sans text-xs">Standard EMI Formula:</div>
            <div>EMI = P × r × (1+r)^n / ((1+r)^n - 1)</div>
            <div className="text-[11px] text-gray-500 font-sans mt-1">
              Where P = Principal Loan Amount, r = Monthly Interest Rate (Annual Rate / 12 / 100), n = Total Number of Monthly Installments.
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
