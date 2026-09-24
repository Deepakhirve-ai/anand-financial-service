'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

interface EnquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLoanType?: string;
}

export default function EnquiryFormModal({
  isOpen,
  onClose,
  defaultLoanType = 'Home Loan'
}: EnquiryFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    loanType: defaultLoanType,
    loanAmount: '',
    monthlyIncome: '',
    employmentType: 'Salaried',
    businessType: '',
    propertyType: '',
    existingEMI: '',
    preferredContactTime: 'Anytime',
    message: '',
    consent: false
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedData, setSubmittedData] = useState<{
    enquiryNumber: string;
    message: string;
  } | null>(null);

  if (!isOpen) return null;

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
        setSubmittedData({
          enquiryNumber: data.enquiryNumber,
          message: data.message
        });
      } else {
        setErrorMsg(data.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedData(null);
    setErrorMsg('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      loanType: defaultLoanType,
      loanAmount: '',
      monthlyIncome: '',
      employmentType: 'Salaried',
      businessType: '',
      propertyType: '',
      existingEMI: '',
      preferredContactTime: 'Anytime',
      message: '',
      consent: false
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 my-8">
        
        {/* Modal Header */}
        <div className="bg-[#0A2540] text-white px-6 py-5 flex items-center justify-between border-b border-blue-900">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Loan Enquiry & Information Request</h2>
            <p className="text-xs text-blue-200 mt-0.5">
              Anand Financial Service • Professional Assistance
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-blue-900/50 hover:bg-blue-800 flex items-center justify-center text-gray-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submittedData ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Enquiry Submitted Successfully!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {submittedData.message}
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-xs mx-auto text-center">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Your Unique Enquiry Reference ID</div>
                <div className="text-xl font-bold text-[#0A2540] mt-1">{submittedData.enquiryNumber}</div>
              </div>

              <p className="text-xs text-gray-500 pt-2">
                An executive from Anand Financial Service will contact you shortly during business hours.
              </p>

              <button
                onClick={resetAndClose}
                className="mt-4 bg-[#0A2540] hover:bg-blue-900 text-white font-semibold px-8 py-2.5 rounded-lg text-sm transition-colors"
              >
                Close Window
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
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
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

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
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

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Mumbai, Pune, Delhi"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                {/* Loan Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Loan Product <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="Home Loan">Home Loan</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Loan Against Property">Loan Against Property</option>
                    <option value="Other">Other Financing Enquiry</option>
                  </select>
                </div>

                {/* Loan Amount */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Required Loan Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="loanAmount"
                    required
                    placeholder="e.g. 2500000"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                {/* Monthly Income */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Monthly Income / Business Turnover (₹)
                  </label>
                  <input
                    type="number"
                    name="monthlyIncome"
                    placeholder="e.g. 75000"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                {/* Employment Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Employment / Business Type
                  </label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="Salaried">Salaried (Private / Govt)</option>
                    <option value="Self-Employed Business">Self-Employed Business</option>
                    <option value="Self-Employed Professional">Self-Employed Professional (CA/Doctor)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Conditional Business or Property Details */}
              {formData.loanType === 'Business Loan' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Business Activity / Registration Type
                  </label>
                  <input
                    type="text"
                    name="businessType"
                    placeholder="e.g. Retail Trading, Manufacturing, GST Registered"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              )}

              {formData.loanType === 'Loan Against Property' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Property Type Offered as Security
                  </label>
                  <input
                    type="text"
                    name="propertyType"
                    placeholder="e.g. Residential House, Commercial Shop, Industrial Plot"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              )}

              {/* Existing EMI & Contact Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Current Monthly Existing EMI Obligations (₹)
                  </label>
                  <input
                    type="number"
                    name="existingEMI"
                    placeholder="0 if none"
                    value={formData.existingEMI}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Preferred Contact Time
                  </label>
                  <select
                    name="preferredContactTime"
                    value={formData.preferredContactTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="Anytime">Anytime during Business Hours</option>
                    <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Additional Notes / Specific Requirements
                </label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Mention any specific property details, balance transfer requirements, or queries..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              {/* Mandatory Consent Checkbox */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="consent" className="text-xs text-gray-600 leading-normal">
                  I agree to the collection and use of my information for responding to my enquiry, subject to the Privacy Policy. I understand that loan approval is subject to lender criteria.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0A2540] hover:bg-blue-900 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors shadow flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blue-300" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-blue-300" />
                      Submit Enquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
