import {
  LoanProduct,
  InterestRateItem,
  DocumentItem,
  FAQItem,
  WebsiteSettings,
  EnquiryItem,
  RateHistoryItem,
  INITIAL_LOANS,
  INITIAL_FAQS,
  INITIAL_DOCUMENTS,
  INITIAL_WEBSITE_SETTINGS,
  INITIAL_ENQUIRIES
} from './seedData';

// Singleton in-memory persistent store
class DataStore {
  private loans: LoanProduct[] = [...INITIAL_LOANS];
  private faqs: FAQItem[] = [...INITIAL_FAQS];
  private documents: DocumentItem[] = [...INITIAL_DOCUMENTS];
  private settings: WebsiteSettings = { ...INITIAL_WEBSITE_SETTINGS };
  private enquiries: EnquiryItem[] = [...INITIAL_ENQUIRIES];
  private rateHistory: RateHistoryItem[] = [
    {
      id: 'rh-1',
      loanId: 'loan-1',
      loanName: 'Home Loan',
      oldRate: 9.00,
      newRate: 8.75,
      rateType: 'Floating',
      effectiveDate: '2026-09-01',
      updatedBy: 'Admin System',
      notes: 'Quarterly rate revision updated according to policy.',
      createdAt: '2026-09-01T10:00:00Z'
    }
  ];

  // Loans
  public getLoans(): LoanProduct[] {
    return this.loans;
  }

  public getLoanBySlug(slug: string): LoanProduct | undefined {
    return this.loans.find(l => l.slug.toLowerCase() === slug.toLowerCase());
  }

  public getLoanById(id: string): LoanProduct | undefined {
    return this.loans.find(l => l.id === id);
  }

  public updateLoan(id: string, updatedFields: Partial<LoanProduct>): LoanProduct | null {
    const index = this.loans.findIndex(l => l.id === id);
    if (index === -1) return null;
    
    // Check if starting interest rate changed to create rate history
    const oldLoan = this.loans[index];
    if (
      updatedFields.startingInterestRate !== undefined &&
      updatedFields.startingInterestRate !== oldLoan.startingInterestRate
    ) {
      this.addRateHistory({
        id: 'rh-' + Date.now(),
        loanId: oldLoan.id,
        loanName: oldLoan.name,
        oldRate: oldLoan.startingInterestRate,
        newRate: updatedFields.startingInterestRate,
        rateType: updatedFields.interestType || oldLoan.interestType,
        effectiveDate: new Date().toISOString().split('T')[0],
        updatedBy: 'Admin User',
        notes: 'Interest rate updated via Admin Panel',
        createdAt: new Date().toISOString()
      });
    }

    this.loans[index] = {
      ...this.loans[index],
      ...updatedFields,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    return this.loans[index];
  }

  public addLoan(loan: Omit<LoanProduct, 'id' | 'lastUpdated'>): LoanProduct {
    const newLoan: LoanProduct = {
      ...loan,
      id: 'loan-' + Date.now(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    this.loans.push(newLoan);
    return newLoan;
  }

  public deleteLoan(id: string): boolean {
    const initialLen = this.loans.length;
    this.loans = this.loans.filter(l => l.id !== id);
    return this.loans.length < initialLen;
  }

  // Interest Rates Table View
  public getInterestRates(): InterestRateItem[] {
    return this.loans.map(l => ({
      id: l.id,
      loanId: l.id,
      loanName: l.name,
      slug: l.slug,
      minRate: l.minInterestRate,
      maxRate: l.maxInterestRate,
      startingRate: l.startingInterestRate,
      rateType: l.interestType,
      effectiveDate: l.lastUpdated,
      lastUpdated: l.lastUpdated,
      processingFee: l.processingFee,
      notes: 'Rates subject to applicant credit profile, loan amount, and lender underwriting policy.'
    }));
  }

  // Rate History
  public getRateHistory(): RateHistoryItem[] {
    return this.rateHistory;
  }

  public addRateHistory(item: RateHistoryItem): void {
    this.rateHistory.unshift(item);
  }

  // Documents
  public getDocuments(loanType?: string): DocumentItem[] {
    if (!loanType || loanType.toUpperCase() === 'ALL') {
      return this.documents;
    }
    const target = loanType.toUpperCase();
    return this.documents.filter(d => d.loanType === target || d.loanType === 'ALL');
  }

  public addDocument(doc: Omit<DocumentItem, 'id'>): DocumentItem {
    const newDoc: DocumentItem = {
      ...doc,
      id: 'doc-' + Date.now()
    };
    this.documents.push(newDoc);
    return newDoc;
  }

  public updateDocument(id: string, updatedFields: Partial<DocumentItem>): DocumentItem | null {
    const idx = this.documents.findIndex(d => d.id === id);
    if (idx === -1) return null;
    this.documents[idx] = { ...this.documents[idx], ...updatedFields };
    return this.documents[idx];
  }

  public deleteDocument(id: string): boolean {
    const initialLen = this.documents.length;
    this.documents = this.documents.filter(d => d.id !== id);
    return this.documents.length < initialLen;
  }

  // FAQs
  public getFAQs(category?: string): FAQItem[] {
    if (!category || category === 'All') {
      return this.faqs.sort((a, b) => a.order - b.order);
    }
    return this.faqs
      .filter(f => f.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => a.order - b.order);
  }

  public addFAQ(faq: Omit<FAQItem, 'id'>): FAQItem {
    const newFaq: FAQItem = {
      ...faq,
      id: 'faq-' + Date.now()
    };
    this.faqs.push(newFaq);
    return newFaq;
  }

  public updateFAQ(id: string, updatedFields: Partial<FAQItem>): FAQItem | null {
    const idx = this.faqs.findIndex(f => f.id === id);
    if (idx === -1) return null;
    this.faqs[idx] = { ...this.faqs[idx], ...updatedFields };
    return this.faqs[idx];
  }

  public deleteFAQ(id: string): boolean {
    const initialLen = this.faqs.length;
    this.faqs = this.faqs.filter(f => f.id !== id);
    return this.faqs.length < initialLen;
  }

  // Settings
  public getSettings(): WebsiteSettings {
    return this.settings;
  }

  public updateSettings(newSettings: Partial<WebsiteSettings>): WebsiteSettings {
    this.settings = {
      ...this.settings,
      ...newSettings,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    return this.settings;
  }

  // Enquiries
  public getEnquiries(): EnquiryItem[] {
    return this.enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addEnquiry(enquiry: Omit<EnquiryItem, 'id' | 'enquiryNumber' | 'status' | 'createdAt' | 'updatedAt'>): EnquiryItem {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const newEnquiry: EnquiryItem = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      enquiryNumber: `AFS-${year}-${randomNum}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.enquiries.unshift(newEnquiry);
    return newEnquiry;
  }

  public updateEnquiryStatus(id: string, status: EnquiryItem['status'], adminNotes?: string): EnquiryItem | null {
    const idx = this.enquiries.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.enquiries[idx] = {
      ...this.enquiries[idx],
      status,
      adminNotes: adminNotes !== undefined ? adminNotes : this.enquiries[idx].adminNotes,
      updatedAt: new Date().toISOString()
    };
    return this.enquiries[idx];
  }

  public deleteEnquiry(id: string): boolean {
    const initialLen = this.enquiries.length;
    this.enquiries = this.enquiries.filter(e => e.id !== id);
    return this.enquiries.length < initialLen;
  }
}

// Global instance pattern for Next.js hot module replacement
const globalForStore = globalThis as unknown as {
  dataStore: DataStore | undefined;
};

export const store = globalForStore.dataStore ?? new DataStore();

if (process.env.NODE_ENV !== 'production') {
  globalForStore.dataStore = store;
}
