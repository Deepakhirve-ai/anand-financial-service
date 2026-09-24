'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Phone, Mail, MapPin, ShieldAlert, ArrowRight } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const [settings, setSettings] = useState({
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'contact@anandfinancialservice.com',
    address: 'Plot No. 45, Finance Tower, Main Commercial Complex, City Center, PIN - 400001',
    disclaimer: 'Loan products, interest rates, fees, eligibility criteria and other terms are subject to the applicable lender\'s policies and may change from time to time. Information displayed on this website is for general informational purposes and does not constitute a guarantee of loan approval, sanction or disbursement. Final approval, pricing and terms are determined by the applicable lender after assessment and verification.',
    bankDisclosure: 'Anand Financial Service provides loan information and assistance for eligible customers for loan products offered or assisted through Ujjivan Small Finance Bank, subject to actual authorization, relationship status and current bank terms.'
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setSettings((prev: any) => ({ ...prev, ...data.data }));
        }
      })
      .catch(() => {});
  }, []);

  // Hide footer on admin panel pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2540] text-gray-300 pt-14 pb-8 border-t border-blue-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                ANAND FINANCIAL SERVICE
              </span>
            </div>
            <p className="text-sm text-blue-200 font-medium">
              "Your Trusted Guide to Smarter Loan Solutions"
            </p>
            <p className="text-xs text-gray-300 leading-relaxed max-w-md">
              {settings.bankDisclosure}
            </p>
            <div className="pt-2">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 underline font-medium"
              >
                Admin Panel Access
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-blue-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/loans/home-loan" className="hover:text-white transition-colors">Home Loan</Link>
              </li>
              <li>
                <Link href="/loans/business-loan" className="hover:text-white transition-colors">Business Loan</Link>
              </li>
              <li>
                <Link href="/loans/loan-against-property" className="hover:text-white transition-colors">Loan Against Property</Link>
              </li>
              <li>
                <Link href="/interest-rates" className="hover:text-white transition-colors">Interest Rates</Link>
              </li>
            </ul>
          </div>

          {/* Key Resources */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-blue-800 pb-2">
              Calculators & Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/eligibility" className="hover:text-white transition-colors">Eligibility Calculator</Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-white transition-colors">Documents Required</Link>
              </li>
              <li>
                <Link href="/emi-calculator" className="hover:text-white transition-colors">EMI Calculator</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-blue-800 pb-2">
              Contact Information
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                <span className="break-all">{settings.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                <span className="text-xs text-gray-300 leading-relaxed">{settings.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Disclaimer Box */}
        <div className="bg-blue-950/80 border border-blue-800/80 rounded-xl p-5 mb-8 text-xs text-gray-300 leading-relaxed">
          <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Important Information & Statutory Disclosure</span>
          </div>
          <p>{settings.disclaimer}</p>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            © {currentYear} Anand Financial Service. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-white">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white">Terms of Use</Link>
            <Link href="/contact" className="hover:text-white">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
