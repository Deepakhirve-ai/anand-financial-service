'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import EnquiryFormModal from './EnquiryFormModal';

export default function EligibilityEstimatorComponent() {
  const [loanType, setLoanType] = useState('Home Loan');
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(75000);
  const [employmentType, setEmploymentType] = useState('Salaried');
  const [existingEmi, setExistingEmi] = useState(10000);
  const [desiredAmount, setDesiredAmount] = useState(4000000);
  const [tenureYears, setTenureYears] = useState(20);

  const [modalOpen, setModalOpen] = useState(false);

  // Calculation Logic for Eligibility:
  // FOIR (Fixed Obligation to Income Ratio) calculation:
  // Salaried: up to 50% - 60% of income allowed for total EMI
  // Available monthly EMI = (Income * FOIR) - Existing EMI
  // Max loan estimated based on FOIR at assumed rate of 9.0%
  const FOIR = employmentType === 'Salaried' ? 0.55 : 0.50;
  const availableEmi = Math.max(0, (income * FOIR) - existingEmi);

  // Interest rate assumption for estimator
  const assumedAnnualRate = loanType === 'Business Loan' ? 13.0 : 9.0;
  const r = assumedAnnualRate / 12 / 100;
  const n = tenureYears * 12;

  // PV formula: P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
  let estimatedMaxLoan = 0;
  if (r > 0 && n > 0 && availableEmi > 0) {
    estimatedMaxLoan = availableEmi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
  }
  estimatedMaxLoan = Math.round(estimatedMaxLoan / 10000) * 10000;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0A2540]">Loan Eligibility Estimator</h3>
          <p className="text-xs text-gray-500">
            Check your indicative loan eligibility based on financial obligations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Loan Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Loan Category
              </label>
              <select
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-[#0A2540] bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Home Loan">Home Loan</option>
                <option value="Business Loan">Business Loan</option>
                <option value="Loan Against Property">Loan Against Property</option>
              </select>
            </div>

            {/* Applicant Age */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Applicant Age (Years)
              </label>
              <input
                type="number"
                min={21}
                max={65}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-[#0A2540] focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Net Monthly Income */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Net Monthly Income / Turnover (₹)
              </label>
              <input
                type="number"
                step={5000}
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-[#0A2540] focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Employment Type
              </label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-[#0A2540] bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Salaried">Salaried Employee</option>
                <option value="Self-Employed Business">Self-Employed Business</option>
                <option value="Self-Employed Professional">Self-Employed Professional</option>
              </select>
            </div>

            {/* Existing Monthly EMI */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Existing Monthly EMI Commitments (₹)
              </label>
              <input
                type="number"
                step={1000}
                value={existingEmi}
                onChange={(e) => setExistingEmi(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-[#0A2540] focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Preferred Tenure */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Preferred Loan Tenure (Years)
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-[#0A2540] focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

          </div>

          {/* Desired Amount */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Desired Loan Amount (₹)
            </label>
            <input
              type="number"
              step={50000}
              value={desiredAmount}
              onChange={(e) => setDesiredAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-[#0A2540] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Output Estimation Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0A2540] to-blue-900 text-white rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-blue-300 font-semibold mb-1">
              Estimated Loan Eligibility
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {formatCurrency(estimatedMaxLoan)}
            </div>
            <div className="text-xs text-blue-200 mt-1">
              Max available EMI budget: approx. {formatCurrency(Math.round(availableEmi))} / month
            </div>
          </div>

          <div className="border-t border-blue-800/80 pt-4 space-y-2 text-xs text-blue-100">
            <div className="flex justify-between">
              <span>Category:</span>
              <span className="font-semibold text-white">{loanType}</span>
            </div>
            <div className="flex justify-between">
              <span>FOIR Applied:</span>
              <span className="font-semibold text-white">{Math.round(FOIR * 100)}% of income</span>
            </div>
            <div className="flex justify-between">
              <span>Desired Loan:</span>
              <span className="font-semibold text-white">{formatCurrency(desiredAmount)}</span>
            </div>
          </div>

          {/* Mandatory Non-Guaranteed Disclaimer */}
          <div className="bg-blue-950/80 border border-blue-800/80 rounded-xl p-3.5 text-xs text-blue-200 leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
            <div>
              <div className="font-semibold text-white mb-0.5">Indicative Estimate Only</div>
              Estimated eligibility based on the information provided. Final eligibility is subject to lender assessment, verification and applicable policy.
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            Apply for Assistance
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <EnquiryFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultLoanType={loanType}
      />
    </div>
  );
}
