'use client';

import { useState } from 'react';
import { BsLightbulb } from 'react-icons/bs';
import { FaPhoneVolume } from 'react-icons/fa6';
import { IoMdHeart } from 'react-icons/io';
import { MdWarning } from 'react-icons/md';
import EmergencyService from '../components/pages/acute/EmergencyService';
import Hospital from '../components/pages/acute/Hospital';
import { emergencyServices } from '../data/acute/emegencyServices';

const UrgentHelpPage = () => {
  const [hospitalLink, setHospitalLink] = useState('');
  const [error, setError] = useState('');

  /**
   * This function is used to find the nearest hospital based on the user's location.
   * It uses the navigator.geolocation API to get the user's location.
   * If the user's location is found, it sets the hospital link to the Google Maps link for the user's location.
   */
  const findNearestHospital = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const link = `https://www.google.com/maps/search/sjukhus/@${latitude},${longitude},14z`;
          setHospitalLink(link);
          setError('');
        },
        (err) => {
          console.error('could not find location:', err);
          setError(
            'Platsinformation kunde inte hämtas. Kontrollera att platsåtkomst är aktiverad.'
          );
        }
      );
    } else {
      setError('Platsinformation stöds inte av din enhet.');
    }
  };

  return (
    <section className="flex flex-col gap-10 max-w-[800px] px-4 pt-4 pb-16 sm:py-10 mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <MdWarning className="text-tertiary-dark text-3xl" />
          <h2 className="h-sm sm:h-md text-primary-dark">
            Akut hjälp och support
          </h2>
        </div>
        <div className="bg-primary-light rounded-lg shadow-md">
          <p className="px-6 py-4 text-lg">
            Om du eller någon du känner befinner dig i en akut nödsituation,
            ring omedelbart{' '}
            <a
              href="tel:112"
              className="nav-link font-bold after:!bg-red-600 text-red-600 text-xl"
            >
              112
            </a>{' '}
            för att få hjälp från räddningstjänsten, polisen eller ambulans.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <FaPhoneVolume className="text-primary-medium text-2xl" />
          <h3 className="h-sm text-primary-dark">Hjälplinjer</h3>
        </div>
        <ul className="grid gap-4 md:grid-cols-2 list-none">
          {emergencyServices.map((service) => {
            return <EmergencyService key={service.id} serviceData={service} />;
          })}
        </ul>
      </div>
      <Hospital
        hospitalLink={hospitalLink}
        error={error}
        findNearestHospital={findNearestHospital}
      />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <IoMdHeart className="text-primary-medium text-2xl" />
          <h3 className="h-sm text-primary-dark">Tänk på</h3>
        </div>
        <p className="bg-tertiary-light p-4 rounded-lg shadow-md">
          Du är inte ensam. Det finns hjälp att få, och det är modigt att söka
          den. Även om allt känns övermäktigt nu, kan det bli bättre.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <BsLightbulb className="text-primary-medium text-2xl" />
          <h3 className="h-sm text-primary-dark">Vad kan du göra just nu?</h3>
        </div>
        <ul className="grid gap-3 list-none">
          <li className="flex items-start gap-2">
            <span className="text-primary-medium">•</span>
            Kontakta någon du litar på, som en vän eller familjemedlem.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-medium">•</span>
            Ta några djupa andetag och fokusera på att lugna dig själv.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-medium">•</span>
            Skriv ner dina tankar för att få klarhet.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-medium">•</span>
            Kom ihåg att det är helt okej att söka hjälp – du förtjänar stöd.
          </li>
        </ul>
      </div>

      <p className="italic text-dark">
        För mer information och hjälp kan du besöka{' '}
        <a
          href="https://www.1177.se"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-dark/80 hover:text-secondary-dark underline transition-colors"
          aria-label="länk till 1177"
        >
          1177.se
        </a>
        .
      </p>
    </section>
  );
};

export default UrgentHelpPage;
