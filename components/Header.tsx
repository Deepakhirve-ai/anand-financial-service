'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  ChevronDown, 
  Menu, 
  X, 
  Home, 
  Briefcase, 
  Building, 
  Calculator, 
  CheckCircle2, 
  FileText, 
  Percent, 
  PhoneCall, 
  HelpCircle, 
  Info,
  ShieldCheck
} from 'lucide-react';
import EnquiryFormModal from './EnquiryFormModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loansDropdownOpen, setLoansDropdownOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render public header on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const loans = [
    { name: 'Home Loan', href: '/loans/home-loan', desc: 'Finance your dream home with low rates', icon: Home },
    { name: 'Business Loan', href: '/loans/business-loan', desc: 'Capital for expansion & working capital', icon: Briefcase },
    { name: 'Loan Against Property', href: '/loans/loan-against-property', desc: 'Secured loans against residential/commercial property', icon: Building },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A2540] text-white shadow-lg py-3'
            : 'bg-[#0A2540] text-white py-4 border-b border-blue-900/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-blue-500 transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-blue-200 transition-colors leading-tight">
                  ANAND FINANCIAL SERVICE
                </span>
                <span className="text-[10px] sm:text-xs text-blue-200 font-medium tracking-wide">
                  Loan Information & Assistance
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/' ? 'text-blue-300 bg-blue-950/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                Home
              </Link>

              {/* Loans Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setLoansDropdownOpen(true)}
                onMouseLeave={() => setLoansDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.startsWith('/loans') ? 'text-blue-300 bg-blue-950/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
                  }`}
                >
                  Loans
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${loansDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {loansDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Loan Products
                    </div>
                    {loans.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setLoansDropdownOpen(false)}
                          className="flex items-start gap-3 px-3 py-2.5 hover:bg-blue-50/80 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="/interest-rates"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/interest-rates' ? 'text-blue-300 bg-blue-950/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                Interest Rates
              </Link>

              <Link
                href="/eligibility"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/eligibility' ? 'text-blue-300 bg-blue-950/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                Eligibility
              </Link>

              <Link
                href="/documents"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/documents' ? 'text-blue-300 bg-blue-950/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                Documents
              </Link>

              <Link
                href="/emi-calculator"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/emi-calculator' ? 'text-blue-300 bg-blue-950/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                EMI Calculator
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/about' ? 'text-blue-300 bg-blue-950/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                About Us
              </Link>

              <Link
                href="/faq"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/faq' ? 'text-blue-300 bg-blue-950/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                FAQs
              </Link>

              <Link
                href="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/contact' ? 'text-blue-300 bg-blue-950/60' : 'text-gray-200 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-200" />
                Check Eligibility
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md"
              >
                Eligibility
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-900 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A2540] border-t border-blue-900 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-blue-900/50"
            >
              Home
            </Link>

            <div className="space-y-1 pl-3 border-l-2 border-blue-600">
              <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider px-3 py-1">
                Loan Products
              </div>
              {loans.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-blue-900/50"
                >
                  {l.name}
                </Link>
              ))}
            </div>

            <Link
              href="/interest-rates"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-blue-900/50"
            >
              Interest Rates
            </Link>
            <Link
              href="/eligibility"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-blue-900/50"
            >
              Eligibility
            </Link>
            <Link
              href="/documents"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-blue-900/50"
            >
              Documents Required
            </Link>
            <Link
              href="/emi-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-blue-900/50"
            >
              EMI Calculator
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-blue-900/50"
            >
              About Us
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-blue-900/50"
            >
              FAQs
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-blue-900/50"
            >
              Contact
            </Link>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryModalOpen(true);
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg text-center flex items-center justify-center gap-2 shadow"
              >
                <CheckCircle2 className="w-5 h-5 text-blue-200" />
                Check Eligibility / Apply
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modal Popup */}
      <EnquiryFormModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </>
  );
}
