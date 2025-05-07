'use client';

import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

interface DownloadPDFButtonProps {
  children: React.ReactNode;
}

export default function DownloadPDFButton({ children }: DownloadPDFButtonProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (contentRef.current) {
      const element = contentRef.current;
      const options = {
        margin: 0.5,
        filename: 'visitor-pass.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      html2pdf().set(options).from(element).save();
    }
  };

  return (
    <div>
      <button
        onClick={handleDownloadPDF}
        className="inline-block bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
      >
        Download PDF
      </button>
      <div
        ref={contentRef}
        className="absolute -left-[9999px]" // Position off-screen instead of hiding
        style={{ width: '400px' }} // Match the print-card width for consistency
      >
        {children}
      </div>
    </div>
  );
}