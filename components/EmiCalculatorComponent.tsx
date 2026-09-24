'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, AlertCircle, PieChart, CheckCircle } from 'lucide-react';

interface EmiCalculatorProps {
  initialAmount?: number;
  initialRate?: number;
  initialTenureYears?: number;
  title?: string;
}

export default function EmiCalculatorComponent({
  initialAmount = 2500000,
  initialRate = 8.75,
  initialTenureYears = 20,
  title = 'Interactive Loan EMI Calculator'
}: EmiCalculatorProps) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [rate, setRate] = useState<number>(initialRate);
  const [tenureValue, setTenureValue] = useState<number>(initialTenureYears);
  const [tenureUnit, setTenureUnit] = useState<'YEARS' | 'MONTHS'>('YEARS');

  // Convert tenure to total months
  const totalMonths = useMemo(() => {
    return tenureUnit === 'YEARS' ? tenureValue * 12 : tenureValue;
  }, [tenureValue, tenureUnit]);

  // EMI Calculation Formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1)
  const calculation = useMemo(() => {
    const P = amount;
    const r = rate / 12 / 100;
    const n = Math.max(1, totalMonths);

    if (P <= 0 || r <= 0 || n <= 0) {
      return { monthlyEmi: 0, totalPayment: 0, totalInterest: 0, principalPercentage: 50, interestPercentage: 50 };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emi * n;
    const totalInt = Math.max(0, totalPay - P);

    const principalPct = Math.round((P / totalPay) * 100) || 50;
    const interestPct = Math.max(0, 100 - principalPct);

    return {
      monthlyEmi: Math.round(emi),
      totalPayment: Math.round(totalPay),
      totalInterest: Math.round(totalInt),
      principalPercentage: principalPct,
      interestPercentage: interestPct
    };
  }, [amount, rate, totalMonths]);

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
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0A2540]">{title}</h3>
          <p className="text-xs text-gray-500">
            Adjust sliders to calculate your monthly EMI and repayment schedule
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Sliders Section */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Loan Amount (Principal)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-sm text-gray-500 font-semibold">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                  className="pl-7 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm font-bold text-[#0A2540] w-36 text-right focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={100000}
              max={15000000}
              step={50000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>₹1 Lakh</span>
              <span>₹50 Lakhs</span>
              <span>₹1.5 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Interest Rate (% p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  value={rate}
                  onChange={(e) => setRate(Math.max(1, Number(e.target.value)))}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-bold text-[#0A2540] w-24 text-right focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-xs text-gray-500 font-semibold">%</span>
              </div>
            </div>
            <input
              type="range"
              min={5}
              max={24}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>5.0%</span>
              <span>12.5%</span>
              <span>24.0%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Loan Tenure
              </label>

              {/* Years / Months Toggle */}
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 p-0.5 rounded-lg flex text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      if (tenureUnit === 'MONTHS') {
                        setTenureValue(Math.max(1, Math.round(tenureValue / 12)));
                        setTenureUnit('YEARS');
                      }
                    }}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      tenureUnit === 'YEARS' ? 'bg-[#0A2540] text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Years
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (tenureUnit === 'YEARS') {
                        setTenureValue(tenureValue * 12);
                        setTenureUnit('MONTHS');
                      }
                    }}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      tenureUnit === 'MONTHS' ? 'bg-[#0A2540] text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Months
                  </button>
                </div>

                <input
                  type="number"
                  value={tenureValue}
                  onChange={(e) => setTenureValue(Math.max(1, Number(e.target.value)))}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-bold text-[#0A2540] w-20 text-right focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <input
              type="range"
              min={1}
              max={tenureUnit === 'YEARS' ? 30 : 360}
              step={1}
              value={tenureValue}
              onChange={(e) => setTenureValue(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>1 {tenureUnit.toLowerCase()}</span>
              <span>{tenureUnit === 'YEARS' ? '15 years' : '180 months'}</span>
              <span>{tenureUnit === 'YEARS' ? '30 years' : '360 months'}</span>
            </div>
          </div>
        </div>

        {/* Output Calculation Cards & SVG Chart */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-[#0A2540] text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between space-y-6">
          
          <div>
            <div className="text-xs uppercase tracking-widest text-blue-300 font-semibold mb-1">
              Monthly Payable EMI
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {formatCurrency(calculation.monthlyEmi)}
            </div>
            <div className="text-[11px] text-blue-200 mt-1">
              for {totalMonths} monthly installments @ {rate}% p.a.
            </div>
          </div>

          <div className="border-t border-blue-800/80 pt-4 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-blue-200">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block"></span>
                Principal Loan Amount
              </span>
              <span className="font-bold text-white text-sm">{formatCurrency(amount)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-blue-200">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                Total Interest Payable
              </span>
              <span className="font-bold text-amber-300 text-sm">{formatCurrency(calculation.totalInterest)}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-blue-800/60 font-semibold text-sm">
              <span className="text-white">Total Amount Payable</span>
              <span className="text-white font-extrabold">{formatCurrency(calculation.totalPayment)}</span>
            </div>
          </div>

          {/* Visual Percentage Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-medium text-blue-200">
              <span>Principal: {calculation.principalPercentage}%</span>
              <span>Interest: {calculation.interestPercentage}%</span>
            </div>
            <div className="h-3 w-full bg-blue-950 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${calculation.principalPercentage}%` }}
                className="bg-blue-400 h-full transition-all duration-300"
              />
              <div
                style={{ width: `${calculation.interestPercentage}%` }}
                className="bg-amber-400 h-full transition-all duration-300"
              />
            </div>
          </div>

          <div className="bg-blue-950/60 border border-blue-800/60 rounded-xl p-3 text-[11px] text-blue-200 leading-relaxed flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <span>
              Results are illustrative estimates and actual repayment may vary according to sanctioned loan terms.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
