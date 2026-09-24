export interface LoanProduct {
  id: string;
  name: string;
  slug: string;
  category: 'HOME_LOAN' | 'BUSINESS_LOAN' | 'LOAN_AGAINST_PROPERTY';
  shortDescription: string;
  fullDescription: string;
  minLoanAmount: number;
  maxLoanAmount: number;
  minInterestRate: number;
  maxInterestRate: number;
  startingInterestRate: number;
  interestType: 'Floating' | 'Fixed' | 'Hybrid';
  minTenure: number; // in months
  maxTenure: number; // in months
  processingFee: string;
  otherCharges: string;
  eligibility: string[];
  documents: string[];
  features: string[];
  purposes: string[];
  status: 'ACTIVE' | 'INACTIVE';
  lastUpdated: string;
}

export interface InterestRateItem {
  id: string;
  loanId: string;
  loanName: string;
  slug: string;
  minRate: number;
  maxRate: number;
  startingRate: number;
  rateType: 'Floating' | 'Fixed' | 'Hybrid';
  effectiveDate: string;
  lastUpdated: string;
  processingFee: string;
  notes: string;
}

export interface DocumentItem {
  id: string;
  loanType: 'HOME_LOAN' | 'BUSINESS_LOAN' | 'LOAN_AGAINST_PROPERTY' | 'ALL';
  category: 'Identity' | 'Address' | 'Income' | 'Employment' | 'Business' | 'Property' | 'Banking' | 'Other';
  documentName: string;
  description: string;
  mandatory: boolean;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Home Loan' | 'Business Loan' | 'Loan Against Property' | 'EMI & Rates';
  order: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface EligibilityCriteria {
  id: string;
  loanType: 'HOME_LOAN' | 'BUSINESS_LOAN' | 'LOAN_AGAINST_PROPERTY';
  minAge: number;
  maxAge: number;
  minIncome: number; // Monthly in INR
  minBusinessVintageYears?: number;
  employmentTypes: string[];
  creditScoreMinimum: number;
  propertyCriteria?: string;
  otherConditions: string[];
}

export interface WebsiteSettings {
  companyName: string;
  tagline: string;
  supportingLine: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  businessHours: string;
  disclaimer: string;
  bankDisclosure: string;
  privacyPolicy: string;
  termsAndConditions: string;
  lastUpdated: string;
}

export interface EnquiryItem {
  id: string;
  enquiryNumber: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  loanType: string;
  loanAmount: number;
  monthlyIncome: number;
  employmentType: string;
  businessType?: string;
  propertyType?: string;
  existingEMI?: number;
  preferredContactTime?: string;
  message?: string;
  consent: boolean;
  status: 'New' | 'Contacted' | 'Follow Up' | 'Interested' | 'Not Interested' | 'Converted' | 'Closed';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RateHistoryItem {
  id: string;
  loanId: string;
  loanName: string;
  oldRate: number;
  newRate: number;
  rateType: string;
  effectiveDate: string;
  updatedBy: string;
  notes: string;
  createdAt: string;
}

export const INITIAL_WEBSITE_SETTINGS: WebsiteSettings = {
  companyName: 'ANAND FINANCIAL SERVICE',
  tagline: 'Your Trusted Guide to Smarter Loan Solutions',
  supportingLine: 'Understand Your Loan. Know Your Options. Make an Informed Decision.',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'contact@anandfinancialservice.com',
  address: 'Plot No. 45, Finance Tower, Main Commercial Complex, City Center, PIN - 400001',
  businessHours: 'Monday – Saturday: 9:30 AM – 6:30 PM (Closed on Sundays & Public Holidays)',
  disclaimer: 'Loan products, interest rates, fees, eligibility criteria and other terms are subject to the applicable lender\'s policies and may change from time to time. Information displayed on this website is for general informational purposes and does not constitute a guarantee of loan approval, sanction or disbursement. Final approval, pricing and terms are determined by the applicable lender after assessment and verification.',
  bankDisclosure: 'Anand Financial Service provides loan information and assistance for eligible customers for loan products offered or assisted through Ujjivan Small Finance Bank, subject to actual authorization, relationship status and current bank terms.',
  privacyPolicy: 'We respect customer privacy and are committed to protecting personal data submitted through our loan enquiry forms in accordance with applicable data protection laws.',
  termsAndConditions: 'All loan information, calculators, and rate comparisons provided on this website are illustrative estimates meant to assist borrowers in making informed choices.',
  lastUpdated: '2026-09-25'
};

export const INITIAL_LOANS: LoanProduct[] = [
  {
    id: 'loan-1',
    name: 'Home Loan',
    slug: 'home-loan',
    category: 'HOME_LOAN',
    shortDescription: 'Finance your dream home with suitable home financing options.',
    fullDescription: 'Explore comprehensive financing options for purchasing a new flat, constructing a residential property, improving your existing home, or acquiring property-backed composite financing.',
    minLoanAmount: 500000,
    maxLoanAmount: 10000000,
    minInterestRate: 8.75,
    maxInterestRate: 11.50,
    startingInterestRate: 8.75,
    interestType: 'Floating',
    minTenure: 36,
    maxTenure: 360,
    processingFee: '0.50% - 1.00% of sanctioned loan amount + applicable taxes',
    otherCharges: 'Documentation charges, Legal & Valuation fees at actuals, CERSAI charges up to ₹500',
    eligibility: [
      'Age between 21 and 65 years at loan maturity',
      'Minimum monthly income of ₹25,000 for salaried applicants',
      'Minimum 2 years of stable business vintage for self-employed',
      'Satisfactory credit score (CIBIL 700+ preferred)',
      'Clear title and legally permissible residential property'
    ],
    documents: [
      'PAN Card / Form 60',
      'Aadhaar / Passport / Voter ID for Identity & Address',
      'Last 6 months Bank Account Statements',
      'Latest 3 months Salary Slips (Salaried)',
      'Last 2 years ITR with Computation & Financials (Self-Employed)',
      'Approved Building Plan & Property Title Documents'
    ],
    features: [
      'Attractive floating interest rate options',
      'Flexible repayment tenure up to 30 years',
      'Transparent processing and minimal documentation',
      'Balance transfer & top-up facility available for eligible borrowers',
      'No prepayment penalty on floating rate loans for individuals'
    ],
    purposes: [
      'Home Purchase (Flat / Builder Property)',
      'Home Construction on owned plot',
      'Home Improvement / Renovation',
      'Composite Loan (Plot purchase + Construction)',
      'Balance Transfer of existing higher-rate home loan'
    ],
    status: 'ACTIVE',
    lastUpdated: '2026-09-25'
  },
  {
    id: 'loan-2',
    name: 'Business Loan',
    slug: 'business-loan',
    category: 'BUSINESS_LOAN',
    shortDescription: 'Explore financing solutions for business growth, working capital and expansion.',
    fullDescription: 'Customized business financing assistance to meet working capital requirements, purchase raw materials, upgrade equipment, or expand commercial operations.',
    minLoanAmount: 200000,
    maxLoanAmount: 5000000,
    minInterestRate: 12.50,
    maxInterestRate: 18.00,
    startingInterestRate: 12.50,
    interestType: 'Fixed',
    minTenure: 12,
    maxTenure: 60,
    processingFee: '1.50% - 2.50% of loan amount + applicable taxes',
    otherCharges: 'Documentation charges, Cheque bounce / NACH failure penalty',
    eligibility: [
      'Business vintage of minimum 2 to 3 years in current activity',
      'Minimum annual business turnover of ₹15 Lakhs',
      'Profitable business track record for last 2 years',
      'Clean banking track record with minimal cheque returns',
      'Satisfactory credit history of promoters/proprietor'
    ],
    documents: [
      'Proprietor / Partners / Directors PAN & Aadhaar',
      'Business Registration Proof (GST / Udyam / Shops & Establishment)',
      'Last 12 months Business Bank Account Statements',
      'Last 2 years Audited Financials / ITR with Computation',
      'Partnership Deed / MOA & AOA (if applicable)'
    ],
    features: [
      'Collateral-free options subject to eligibility assessment',
      'Flexible loan tenure from 12 to 60 months',
      'Fast-track documentation and evaluation',
      'Customized structured repayment options for seasonal businesses'
    ],
    purposes: [
      'Working Capital & Inventory Purchase',
      'Business Expansion & New Branch Opening',
      'Machinery & Commercial Equipment Purchase',
      'Business Infrastructure Upgrade'
    ],
    status: 'ACTIVE',
    lastUpdated: '2026-09-25'
  },
  {
    id: 'loan-3',
    name: 'Loan Against Property',
    slug: 'loan-against-property',
    category: 'LOAN_AGAINST_PROPERTY',
    shortDescription: 'Explore secured financing against eligible residential or commercial property.',
    fullDescription: 'Unlock the hidden equity in your fully constructed residential or commercial property with a secured Loan Against Property (LAP) for personal or business needs.',
    minLoanAmount: 500000,
    maxLoanAmount: 15000000,
    minInterestRate: 9.75,
    maxInterestRate: 13.50,
    startingInterestRate: 9.75,
    interestType: 'Floating',
    minTenure: 24,
    maxTenure: 180,
    processingFee: '1.00% - 1.50% of loan amount + applicable taxes',
    otherCharges: 'Legal Title Verification fee, Technical Valuation fee, Mortgage Registration / Stamp Duty',
    eligibility: [
      'Self-employed individuals, salaried employees, or business entities',
      'Fully constructed, free-hold residential or commercial property',
      'Clear property ownership documents with no legal encumbrance',
      'Sufficient income to service total monthly EMI obligations',
      'Property valuation and LTV (Loan to Value) ratio compliant with lender policy'
    ],
    documents: [
      'Identity & Address Proof of all Co-applicants & Property Owners',
      'PAN Card / Form 60',
      'Last 6 to 12 months Bank Account Statements',
      'Income Proof: Salary Slips / ITR with Computation & Financials',
      'Complete Property Chain Documents, Sale Deed, Approved Layout Plan',
      'Latest Property Tax Receipt & Society Maintenance Bills'
    ],
    features: [
      'Higher loan amount capability compared to uncollateralized loans',
      'Lower interest rates than unsecured personal or business loans',
      'Longer repayment tenure up to 15 years',
      'Multi-purpose utilization (Business expansion, Higher education, Debt consolidation)'
    ],
    purposes: [
      'Business Expansion & Commercial Capital',
      'Higher Education financing',
      'Consolidation of multiple short-term debts',
      'Major medical or family financial obligations'
    ],
    status: 'ACTIVE',
    lastUpdated: '2026-09-25'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is a Home Loan?',
    answer: 'A Home Loan is a secured loan provided by financial institutions to assist eligible individuals in purchasing a residential house or flat, constructing a house on land, or carrying out major home improvements.',
    category: 'Home Loan',
    order: 1,
    status: 'ACTIVE'
  },
  {
    id: 'faq-2',
    question: 'What is a Business Loan?',
    answer: 'A Business Loan is financing extended to business owners, self-employed professionals, and enterprise entities for business expansion, purchasing stock/inventory, buying machinery, or maintaining adequate working capital.',
    category: 'Business Loan',
    order: 2,
    status: 'ACTIVE'
  },
  {
    id: 'faq-3',
    question: 'What is Loan Against Property (LAP)?',
    answer: 'Loan Against Property is a secured loan where an eligible residential or commercial property owned by the applicant is mortgaged as security to secure loan funds for business or personal requirements.',
    category: 'Loan Against Property',
    order: 3,
    status: 'ACTIVE'
  },
  {
    id: 'faq-4',
    question: 'What documents are generally required for loan assistance?',
    answer: 'General document requirements include Identity Proof (PAN/Aadhaar/Voter ID), Address Proof, Bank Statements for the last 6–12 months, Income Proof (Salary Slips / ITR / Financial Statements), and Property/Business Proof as applicable to the product.',
    category: 'General',
    order: 4,
    status: 'ACTIVE'
  },
  {
    id: 'faq-5',
    question: 'How is the interest rate decided for an applicant?',
    answer: 'Interest rates are determined by the lender based on the loan product, borrower profile, employment stability, income levels, credit score, loan amount, collateral value, and prevailing lender pricing policies.',
    category: 'EMI & Rates',
    order: 5,
    status: 'ACTIVE'
  },
  {
    id: 'faq-6',
    question: 'What factors affect loan eligibility?',
    answer: 'Key eligibility factors include applicant age, monthly net income/turnover, existing EMI commitments, credit history (CIBIL score), employment or business stability, and property valuation where applicable.',
    category: 'General',
    order: 6,
    status: 'ACTIVE'
  },
  {
    id: 'faq-7',
    question: 'Does credit history affect loan eligibility?',
    answer: 'Yes. Lenders review credit reports (such as CIBIL) to assess past repayment discipline. A higher credit score generally improves the likelihood of loan approval and favorable terms.',
    category: 'General',
    order: 7,
    status: 'ACTIVE'
  },
  {
    id: 'faq-8',
    question: 'What is EMI and how is it calculated?',
    answer: 'EMI stands for Equated Monthly Installment. It is a fixed monthly payment made by a borrower to repay a loan. EMI is calculated using the principal loan amount, applicable interest rate, and repayment tenure.',
    category: 'EMI & Rates',
    order: 8,
    status: 'ACTIVE'
  },
  {
    id: 'faq-9',
    question: 'How is EMI calculated mathematically?',
    answer: 'EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the Principal loan amount, r is the monthly interest rate, and n is the total number of monthly installments.',
    category: 'EMI & Rates',
    order: 9,
    status: 'ACTIVE'
  },
  {
    id: 'faq-10',
    question: 'What is a floating interest rate?',
    answer: 'A floating interest rate changes periodically according to market benchmarks or lender benchmark rates (such as Repo Rate / EBLR). Your EMI or loan tenure may adjust when benchmark rates change.',
    category: 'EMI & Rates',
    order: 10,
    status: 'ACTIVE'
  },
  {
    id: 'faq-11',
    question: 'What is a fixed interest rate?',
    answer: 'A fixed interest rate remains unchanged throughout the specified loan period, ensuring consistent EMI payments regardless of market rate fluctuations.',
    category: 'EMI & Rates',
    order: 11,
    status: 'ACTIVE'
  },
  {
    id: 'faq-12',
    question: 'What additional charges may apply on a loan?',
    answer: 'Applicable charges may include Processing Fees, Documentation Fees, Legal Verification Charges, Technical Valuation Fees, CERSAI filing fees, Stamp Duty, and statutory taxes as per lender rules.',
    category: 'General',
    order: 12,
    status: 'ACTIVE'
  },
  {
    id: 'faq-13',
    question: 'How long can loan repayment take?',
    answer: 'Repayment tenures vary by product: Home Loans range from 3 to 30 years (36–360 months), Business Loans from 1 to 5 years (12–60 months), and Loan Against Property up to 15 years (24–180 months).',
    category: 'General',
    order: 13,
    status: 'ACTIVE'
  },
  {
    id: 'faq-14',
    question: 'Can self-employed applicants apply for loan assistance?',
    answer: 'Yes. Self-employed individuals, proprietors, partners, and directors with audited financial statements or ITR records meeting eligibility criteria can apply.',
    category: 'General',
    order: 14,
    status: 'ACTIVE'
  },
  {
    id: 'faq-15',
    question: 'What happens after submitting an enquiry on this website?',
    answer: 'After submitting an enquiry, an Anand Financial Service loan representative will review your basic details, connect with you to explain loan options, check document readiness, and guide you through the formal lender application process.',
    category: 'General',
    order: 15,
    status: 'ACTIVE'
  },
  {
    id: 'faq-16',
    question: 'Is loan approval guaranteed?',
    answer: 'No. Loan approval is never guaranteed. Final sanctioning, loan amount, interest pricing, and disbursement are strictly subject to lender underwriting criteria, document verification, and credit policy compliance.',
    category: 'General',
    order: 16,
    status: 'ACTIVE'
  },
  {
    id: 'faq-17',
    question: 'What happens if EMI is not paid on time?',
    answer: 'Delaying or missing an EMI payment results in penal charges, adversely impacts your CIBIL credit score, and for secured loans, may initiate recovery proceedings under applicable loan agreements and statutory laws.',
    category: 'General',
    order: 17,
    status: 'ACTIVE'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  { id: 'doc-1', loanType: 'ALL', category: 'Identity', documentName: 'PAN Card / Form 60', description: 'Mandatory primary identity proof for all applicants & co-applicants', mandatory: true, status: 'ACTIVE' },
  { id: 'doc-2', loanType: 'ALL', category: 'Identity', documentName: 'Aadhaar Card / Passport / Voter ID', description: 'Officially valid photo identity document', mandatory: true, status: 'ACTIVE' },
  { id: 'doc-3', loanType: 'ALL', category: 'Address', documentName: 'Aadhaar / Utility Bill / Passport', description: 'Current residence address proof (Electricity / Gas / Water bill within 3 months)', mandatory: true, status: 'ACTIVE' },
  { id: 'doc-4', loanType: 'HOME_LOAN', category: 'Income', documentName: 'Latest 3 Months Salary Slips', description: 'Required for salaried applicants displaying net & gross salary details', mandatory: true, status: 'ACTIVE' },
  { id: 'doc-5', loanType: 'HOME_LOAN', category: 'Income', documentName: 'Form 16 / Last 2 Years ITR', description: 'Annual tax filing records for salaried individuals', mandatory: true, status: 'ACTIVE' },
  { id: 'doc-6', loanType: 'BUSINESS_LOAN', category: 'Income', documentName: 'Last 2 Years ITR with Financials', description: 'Balance Sheet, Profit & Loss statement certified by a Chartered Accountant', mandatory: true, status: 'ACTIVE' },
  { id: 'doc-7', loanType: 'BUSINESS_LOAN', category: 'Business', documentName: 'Business Registration Proof', description: 'GST Certificate, Udyam Registration, Shops & Establishment License', mandatory: true, status: 'ACTIVE' },
  { id: 'doc-8', loanType: 'ALL', category: 'Banking', documentName: 'Last 6 - 12 Months Bank Statements', description: 'Operative primary salary or business bank account statements', mandatory: true, status: 'ACTIVE' },
  { id: 'doc-9', loanType: 'HOME_LOAN', category: 'Property', documentName: 'Title Deed & Approved Plan', description: 'Complete registered sale deed chain, allotment letter, and municipal approved plan', mandatory: true, status: 'ACTIVE' },
  { id: 'doc-10', loanType: 'LOAN_AGAINST_PROPERTY', category: 'Property', documentName: 'Property Ownership Documents & Tax Receipts', description: 'Registered property deed, NOC from society, and latest property tax receipt', mandatory: true, status: 'ACTIVE' },
  { id: 'doc-11', loanType: 'ALL', category: 'Other', documentName: 'Passport Size Photographs', description: '2 recent passport size photographs of each applicant', mandatory: true, status: 'ACTIVE' }
];

export const INITIAL_ENQUIRIES: EnquiryItem[] = [
  {
    id: 'enq-101',
    enquiryNumber: 'AFS-2026-1001',
    name: 'Rajesh Sharma',
    phone: '9876543210',
    email: 'rajesh.sharma@example.com',
    city: 'Mumbai',
    loanType: 'Home Loan',
    loanAmount: 4500000,
    monthlyIncome: 85000,
    employmentType: 'Salaried',
    existingEMI: 12000,
    preferredContactTime: 'Morning (10 AM - 1 PM)',
    message: 'Looking to purchase a 2BHK flat in Thane. Need guidance on interest rates and documents.',
    consent: true,
    status: 'New',
    adminNotes: 'Initial contact pending',
    createdAt: '2026-09-24T14:30:00Z',
    updatedAt: '2026-09-24T14:30:00Z'
  },
  {
    id: 'enq-102',
    enquiryNumber: 'AFS-2026-1002',
    name: 'Priya Traders (Sanjay Verma)',
    phone: '9812345678',
    email: 'sanjay@priyatraders.com',
    city: 'Pune',
    loanType: 'Business Loan',
    loanAmount: 1500000,
    monthlyIncome: 140000,
    employmentType: 'Self-Employed Business',
    businessType: 'Retail Trading',
    existingEMI: 0,
    preferredContactTime: 'Afternoon (2 PM - 5 PM)',
    message: 'Need working capital loan for expanding inventory before festival season.',
    consent: true,
    status: 'Contacted',
    adminNotes: 'Spoke with applicant. Requested GST registration copy.',
    createdAt: '2026-09-23T11:15:00Z',
    updatedAt: '2026-09-24T09:40:00Z'
  }
];
