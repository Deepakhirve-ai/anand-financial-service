'use client';

import React, { useEffect, useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  CheckCircle2, 
  FileText, 
  Percent, 
  Building2 
} from 'lucide-react';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/faqs')
      .then(res => res.json())
      .then(data => {
        if (data.success) setFaqs(data.data);
      })
      .catch(() => {});
  }, []);

  const categories = ['All', 'Home Loan', 'Business Loan', 'Loan Against Property', 'EMI & Rates', 'General'];

  const filteredFaqs = faqs.filter(f => {
    const matchesCategory = activeCategory === 'All' || f.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Banner */}
      <section className="bg-[#0A2540] text-white py-12 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/60 rounded-full px-3 py-1 text-xs text-blue-200 font-medium">
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Knowledge Base & Common Queries</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Frequently Asked Questions (FAQs)
            </h1>
            <p className="text-base text-gray-300">
              Clear, factual answers regarding loan products, eligibility, interest rates, documentation, and EMI calculations.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search & Category Filter */}
        <div className="space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions (e.g. CIBIL score, EMI formula, approval...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                  activeCategory === cat
                    ? 'bg-[#0A2540] text-white border-[#0A2540]'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Accordion Questions List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id || idx}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-blue-50/40 transition-colors"
                  >
                    <span className="font-bold text-base text-[#0A2540]">
                      {idx + 1}. {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                      <p>{faq.answer}</p>
                      <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-gray-400">
                        <span>Category: {faq.category}</span>
                        <span>Configured via Admin FAQ Manager</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
