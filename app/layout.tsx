import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Anand Financial Service | Loan Information & Assistance',
  description: 'Explore Home Loans, Business Loans, and Loan Against Property options with transparent information about eligibility, interest rates, documents, repayment terms, and processing fees.',
  keywords: 'Anand Financial Service, Home Loan, Business Loan, Loan Against Property, EMI Calculator, Loan Rates, Eligibility',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-gray-800 font-sans antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
