'use client';

import { useState } from 'react';
import { emergencyServices } from '../data/emegencyServices';
import EmergencyService from '../components/pages/acute/EmergencyService';
import Image from 'next/image';
import googleMapsIcon from '../assets/icons/google-maps.svg';

const UrgentHelpPage = () => {
  const [hospitalLink, setHospitalLink] = useState('');
  const [error, setError] = useState('');

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
    <section className="flex flex-col gap-10 max-w-[800px]">
      <div className="flex flex-col gap-4">
        <h2 className="h-md text-primary-dark">Akut hjälp och support</h2>
        <p className="bg-primary-light px-6 py-4 text-lg">
          Om du eller någon du känner befinner dig i en akut nödsituation, ring
          omedelbart <span className="font-bold">112</span> för att få hjälp
          från räddningstjänsten, polisen eller ambulans.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="h-sm text-primary-dark">Hjälplinjer</h3>
        <ul>
          {emergencyServices.map((service) => {
            return <EmergencyService key={service.id} serviceData={service} />;
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="h-sm text-primary-dark">Närliggande sjukhus</h3>
        <div className="flex flex-col gap-2">
          {hospitalLink ? (
            <p>Hitta sjukhus via kartan: </p>
          ) : (
            <p>Klicka på knappen nedan för att hitta sjukhus nära dig:</p>
          )}

          {!hospitalLink && !error && (
            <button
              className="primary-button mt-2 w-[250px]"
              onClick={findNearestHospital}
            >
              Hitta närmaste sjukhus
            </button>
          )}
          {hospitalLink && (
            <p className="text-lg inline-block">
              <a
                href={hospitalLink}
                className="flex gap-1 items-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={googleMapsIcon}
                  alt="google maps ikon"
                  width={24}
                  height={24}
                />
                Karta
              </a>
            </p>
          )}
        </div>

        {error && <p className="bg-red-400">{error}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="h-sm text-primary-dark">Tänk på</h3>
        <p>
          Du är inte ensam. Det finns hjälp att få, och det är modigt att söka
          den. Även om allt känns övermäktigt nu, kan det bli bättre.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="h-sm text-primary-dark">Vad kan du göra just nu?</h3>
        <ul>
          <li>Kontakta någon du litar på, som en vän eller familjemedlem.</li>
          <li>Ta några djupa andetag och fokusera på att lugna dig själv.</li>
          <li>Skriv ner dina tankar för att få klarhet.</li>
          <li>
            Kom ihåg att det är helt okej att söka hjälp – du förtjänar stöd.
          </li>
        </ul>
      </div>

      <p className="italic">
        För mer information och hjälp kan du besöka{' '}
        <a
          href="https://www.1177.se"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
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
