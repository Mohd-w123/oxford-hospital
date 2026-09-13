import type { Metadata } from 'next';
import './globals.css';
import { getSiteContent } from '@/lib/content-store';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await getSiteContent();
    return {
      title: `${content.hospital.name} (${content.hospital.hindiName}) | Multi-Speciality Hospital in Sikar`,
      description: `Oxford Hospital Sikar - 24×7 Emergency, ICU, HDU, Modular Operation Theatre, Diagnostic Lab, CT/X-Ray/Ultrasound, Pharmacy, Ambulance, Cashless ECHS/RGHS & 13+ Speciality Doctor Panel.`,
      keywords: [
        'Oxford Hospital Sikar',
        'Oxford Hospital Fatehpur Road',
        'Best hospital in Sikar Rajasthan',
        '24x7 Emergency Hospital Sikar',
        'ICU Critical Care Sikar',
        'RGHS Hospital Sikar',
        'ECHS Empanelled Hospital Sikar',
        'Cashless Hospital Sikar',
        'ऑक्सफोर्ड हॉस्पिटल सीकर'
      ],
      openGraph: {
        title: `${content.hospital.name} - 24×7 Multi-Speciality Hospital in Sikar`,
        description: `24x7 Emergency, ICU, HDU, Modular OT, Cashless Insurance (ECHS/RGHS) & Senior Specialist Doctor Panel.`,
        images: ['/images/gallery/oxford-reception.jpg']
      }
    };
  } catch (error) {
    return {
      title: 'Oxford Hospital | Sikar Rajasthan',
      description: '24×7 Multi-Speciality & Critical Care Hospital with Excellence in Sikar.'
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Yantramanav:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-slate-900 font-sans flex flex-col min-h-screen selection:bg-[#000066] selection:text-white">
        {children}
      </body>
    </html>
  );
}
