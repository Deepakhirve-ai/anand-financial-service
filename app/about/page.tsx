'use client';

import React, { useEffect, useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  FileCheck2, 
  PhoneCall, 
  Users 
} from 'lucide-react';

export default function AboutPage() {
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success) setSettings(data.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Banner */}
      <section className="bg-[#0A2540] text-white py-12 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/60 rounded-full px-3 py-1 text-xs text-blue-200 font-medium">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Corporate & Service Profile</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              About Anand Financial Service
            </h1>
            <p className="text-base text-gray-300">
              "Your Trusted Guide to Smarter Loan Solutions"
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Compliance Relationship Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-xs sm:text-sm text-gray-800 space-y-2">
          <div className="font-bold text-[#0A2540] text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Authorised Information & Assistance Relationship
          </div>
          <p className="leading-relaxed text-gray-700">
            {settings.bankDisclosure || 'Anand Financial Service provides loan information and assistance for eligible customers for loan products offered or assisted through Ujjivan Small Finance Bank, subject to actual authorization, relationship status and current bank terms.'}
          </p>
        </div>

        {/* Section 1: Who We Are */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-2xl font-bold text-[#0A2540] border-b border-gray-100 pb-3">
            Who We Are
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Anand Financial Service is a professional loan information and customer assistance platform dedicated to helping individuals and business owners understand property, home, and commercial loan options clearly.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            We bridge the gap between loan applicants and financial products by providing structured guidance on eligibility criteria, interest rates, documentation checklists, and loan repayment structures.
          </p>
        </section>

        {/* Section 2: What We Do */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-2xl font-bold text-[#0A2540] border-b border-gray-100 pb-3">
            What We Do
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            We provide comprehensive information, interactive calculators, and customer support for:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-700 pl-4 list-disc">
            <li><strong>Home Loans:</strong> Residential flat purchase, home construction, renovation, and balance transfer.</li>
            <li><strong>Business Loans:</strong> Working capital assistance, inventory expansion, machinery purchase, and business development.</li>
            <li><strong>Loan Against Property (LAP):</strong> Secured mortgage financing against residential or commercial real estate.</li>
          </ul>
        </section>

        {/* Section 3: Our Approach */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#0A2540]">Our Core Operating Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540]">Clear Information</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Presenting verified interest rates, fee structures, and loan terms clearly up front.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540]">Professional Assistance</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Guiding borrowers through document verification and application steps systematically.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540]">Transparent Communication</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                No false promises of guaranteed approval or unrealistic zero-processing fee claims.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540]">Customer Support</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Dedicated loan assistance executives available during official business hours.
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
