import LinkWithArrow from '@/app/components/shared/links/LinkWithArrow';

const AgreementRights = () => {
  return (
    <div className="bg-primary-light/50 rounded-lg p-6">
      <h4 className="font-semibold text-lg mb-4">
        Lagen (1924:323) om verkan av avtal under psykisk påverkan
      </h4>
      <p className="mb-4">
        Denna lag är särskilt viktig för personer med bipolär sjukdom, särskilt
        i samband med maniska episoder. Enligt lagen är ett avtal som ingåtts
        under påverkan av en psykisk störning, som en manisk episod, ogiltigt.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2">
            Vad innebär lagen för bipolära personer?
          </h4>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>Avtal som ingåtts under en manisk episod kan vara ogiltiga</li>
            <li>
              Detta gäller särskilt för lån, köp och andra ekonomiska avtal
            </li>
            <li>
              Du behöver inte betala tillbaka mer än vad som använts till
              skäligt underhåll
            </li>
            <li>Läkarintyg eller psykologutlåtande kan krävas som bevis</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Viktigt att tänka på</h4>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>Du måste kunna bevisa att du var i en manisk episod</li>
            <li>
              Det måste finnas ett tydligt samband mellan episoden och avtalen
            </li>
            <li>Kontakta en jurist för hjälp med att hantera situationen</li>
            <li>Samla dokumentation från vården som stöd</li>
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <LinkWithArrow
          link="https://lagen.nu/1924:323"
          text="Läs hela lagen på lagen.nu"
        />
      </div>
    </div>
  );
};

export default AgreementRights;
