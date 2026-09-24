'use client';

import React, { useEffect, useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ContactPage() {
  const [settings, setSettings] = useState<any>({
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'contact@anandfinancialservice.com',
    address: 'Plot No. 45, Finance Tower, Main Commercial Complex, City Center, PIN - 400001',
    businessHours: 'Monday – Saturday: 9:30 AM – 6:30 PM (Closed on Sundays & Public Holidays)'
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Mumbai',
    loanType: 'Home Loan',
    loanAmount: '2500000',
    monthlyIncome: '75000',
    employmentType: 'Salaried',
    message: '',
    consent: false
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedData, setSubmittedData] = useState<any>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.consent) {
      setErrorMsg('Please accept the consent checkbox to submit your enquiry.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setSubmittedData(data);
      } else {
        setErrorMsg(data.message || 'Failed to submit enquiry.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Banner */}
      <section className="bg-[#0A2540] text-white py-12 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-700/60 rounded-full px-3 py-1 text-xs text-blue-200 font-medium">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Customer Assistance & Contact</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Contact Anand Financial Service
            </h1>
            <p className="text-base text-gray-300">
              Get in touch with our loan assistance team or submit your detailed loan enquiry.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Admin Configurable Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-xl font-bold text-[#0A2540] border-b border-gray-100 pb-3">
                Official Business Contact
              </h2>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone Number</div>
                  <div className="text-base font-bold text-[#0A2540] mt-0.5">{settings.phone}</div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center font-bold shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">WhatsApp Contact</div>
                  <div className="text-base font-bold text-[#0A2540] mt-0.5">{settings.whatsapp}</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</div>
                  <div className="text-sm font-bold text-[#0A2540] mt-0.5 break-all">{settings.email}</div>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Office Address</div>
                  <div className="text-xs text-gray-700 leading-relaxed font-medium mt-0.5">{settings.address}</div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Working Hours</div>
                  <div className="text-xs text-gray-700 leading-relaxed font-medium mt-0.5">{settings.businessHours}</div>
                </div>
              </div>

            </div>

            {/* Configurable Admin Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-gray-700 leading-relaxed">
              <span className="font-bold text-[#0A2540]">Note for Customers: </span>
              All contact details above are updated dynamically by the site administrator. You can also submit the enquiry form on the right for immediate assistance.
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="border-b border-gray-100 pb-4 mb-6">
              <h2 className="text-xl font-bold text-[#0A2540]">Submit Loan Information Request</h2>
              <p className="text-xs text-gray-500 mt-0.5">Fill out your details to receive assistance from an executive</p>
            </div>

            {submittedData ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  {submittedData.message}
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-xs mx-auto text-center">
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Your Enquiry ID</div>
                  <div className="text-xl font-bold text-[#0A2540] mt-1">{submittedData.enquiryNumber}</div>
                </div>

                <button
                  onClick={() => setSubmittedData(null)}
                  className="bg-[#0A2540] text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-blue-900 transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg p-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Loan Product *</label>
                    <select
                      name="loanType"
                      value={formData.loanType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      <option value="Home Loan">Home Loan</option>
                      <option value="Business Loan">Business Loan</option>
                      <option value="Loan Against Property">Loan Against Property</option>
                      <option value="Other">Other Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Message / Query</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Enter your message or specific loan requirement..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="contactConsent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <label htmlFor="contactConsent" className="text-xs text-gray-600 leading-normal">
                    I agree to the collection and use of my information for responding to my enquiry, subject to the Privacy Policy.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0A2540] hover:bg-blue-900 text-white font-bold py-3 rounded-xl transition-colors shadow flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blue-300" />
                      Submitting Enquiry...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-blue-300" />
                      Submit Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
