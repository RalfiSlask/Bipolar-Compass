'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BipolarLogo from '../logo/BipolarLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  if (pathname.includes('konto') || pathname.includes('min-sida')) {
    return null;
  }

  return (
    <footer className="w-full bg-gradient-to-b from-primary-dark via-footer-color to-black text-white py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
          <div className="flex flex-col gap-6">
            <div className="">
              <BipolarLogo footer={true} />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Din guide för att navigera livet med bipolär sjukdom. Vi erbjuder
              stöd, information och gemenskap.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-tertiary-light">
              Information
            </h2>
            <nav className="flex flex-col gap-3">
              <Link
                href="/bipolaritet/vad-ar-bipolaritet"
                className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
              >
                Vad är bipolaritet
              </Link>
              <Link
                href="/anhoriga"
                className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
              >
                Anhöriga
              </Link>
              <Link
                href="/behandling"
                className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
              >
                Behandling
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-tertiary-light">
              Resurser
            </h2>
            <nav className="flex flex-col gap-3">
              <Link
                href="/resurser/artiklar"
                className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
              >
                Artiklar
              </Link>
              <Link
                href="/resurser/verktyg"
                className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
              >
                Verktyg
              </Link>
              <Link
                href="/forskning"
                className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
              >
                Forskning
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-tertiary-light">
              Om oss
            </h2>
            <nav className="flex flex-col gap-3">
              <Link
                href="/om-oss/vision"
                className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
              >
                Vision
              </Link>
              <Link
                href="/kontakt"
                className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
              >
                Kontakt
              </Link>
              <a
                href="mailto:info@bipolarkompassen.se"
                className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
              >
                info@bipolarkompassen.se
              </a>
            </nav>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-10" />

        <div className="mb-6">
          <p className="text-xs text-gray-400 text-left max-w-2xl">
            Vårt innehåll utgör inte medicinsk rådgivning. För diagnos och
            behandling av bipolär sjukdom, kontakta alltid legitimerad
            vårdpersonal eller psykiatrisk specialist.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400">
            © {currentYear} Bipolär Kompassen. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/om-oss/villkor"
              className="text-sm text-gray-400 hover:text-tertiary-light transition-colors duration-200"
            >
              Villkor
            </Link>
            <Link
              href="/om-oss/integritetspolicy"
              className="text-sm text-gray-400 hover:text-tertiary-light transition-colors duration-200"
            >
              Integritetspolicy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
