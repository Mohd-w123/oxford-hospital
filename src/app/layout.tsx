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
    const h = content.hospital;
    const title = h.websiteTitle?.trim() || `${h.name}${h.hindiName ? ` (${h.hindiName})` : ''} | ${h.tagline || 'Multi-Speciality Hospital'} - ${h.city}`;
    const description = `${h.name} (${h.hindiName || ''}) ${h.city} - 24×7 Emergency, ICU, HDU, Modular Operation Theatre, Diagnostic Lab, Pharmacy, Ambulance, Cashless ECHS/RGHS & Speciality Doctor Panel.`;
    const favicon = h.faviconUrl || h.logoUrl || '/favicon.ico';

    return {
      title,
      description,
      icons: {
        icon: [{ url: favicon }],
        shortcut: [favicon],
        apple: [favicon]
      },
      keywords: [
        `${h.name} ${h.city}`,
        `${h.name} ${h.address}`,
        `Best hospital in ${h.city} ${h.state}`,
        `24x7 Emergency Hospital ${h.city}`,
        `ICU Critical Care ${h.city}`,
        `RGHS Hospital ${h.city}`,
        `ECHS Empanelled Hospital ${h.city}`,
        `Cashless Hospital ${h.city}`,
        `${h.hindiName} ${h.city}`
      ],
      openGraph: {
        title,
        description,
        images: [h.logoUrl || '/images/gallery/oxford-reception.jpg']
      }
    };
  } catch (error) {
    return {
      title: 'Oxford Hospital | Multi-Speciality Hospital',
      description: '24×7 Multi-Speciality & Critical Care Hospital with Excellence.'
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let favicon = '/favicon.ico';
  try {
    const content = await getSiteContent();
    favicon = content.hospital.faviconUrl || content.hospital.logoUrl || '/favicon.ico';
  } catch (e) {}

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href={favicon} />
        <link rel="shortcut icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
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
