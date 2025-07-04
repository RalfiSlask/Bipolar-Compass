import Image from 'next/image';
import { MdOutlineScience } from 'react-icons/md';
import SectionTitle from '../../shared/headings/SectionTitle';

const Genetics = () => {
  return (
    <div className="flex flex-col gap-6 bg-primary-light rounded-lg p-4 md:p-8 shadow-md responsive-margin-bottom">
      <div className="w-full flex lg:flex-row  flex-col items-center justify-end gap-10 ">
        <div className="flex-1 h-full flex flex-col gap-4 items-center">
          <SectionTitle icon={<MdOutlineScience />}>
            Genetiska och miljömässiga faktorer
          </SectionTitle>
          <div className="w-full rounded-lg overflow-hidden">
            <Image
              src="/images/bipolar/flower-brains.webp"
              alt="hjärna med blommor"
              aria-label="hjärna med blommor"
              width={1200}
              height={800}
              quality={80}
              className="object-cover rounded-sm lg:rounded-lg"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6 text-primary-dark">
          <div>
            <h5 className="font-semibold text-primary-dark mb-2">
              Genetiska faktorer
            </h5>
            <p className="text-primary-dark">
              Forskning visar att bipolär sjukdom har en betydande ärftlig
              komponent. Personer med nära släktingar som har bipolär sjukdom
              löper en högre risk att själva utveckla sjukdomen. Studier har
              identifierat specifika genetiska varianter kopplade till
              sjukdomen, inklusive en variant associerad med psykotiska symtom
              och kognitiva svårigheter.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-primary-dark mb-2">
              Miljömässiga faktorer:
            </h5>
            <p>
              Utöver genetiken spelar miljöfaktorer en viktig roll. Stressiga
              livshändelser, trauma under barndomen och andra psykosociala
              påfrestningar kan öka risken för att utveckla bipolär sjukdom,
              särskilt hos individer med genetisk sårbarhet.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 ">
          <h5 className="font-semibold text-primary-dark">
            Evolutionära perspektiv:
          </h5>
          <p>
            Vissa forskare spekulerar i att de extrema humörsvängningarna vid
            bipolär sjukdom kan ha haft evolutionära fördelar, exempelvis genom
            att perioder av mani främjade kreativitet och initiativförmåga,
            medan depressiva perioder ledde till energibesparing och reflektion.
            Dock är detta område fortfarande föremål för forskning och debatt.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-primary-dark mb-3">
          Neurologiska aspekter:
        </h4>
        <p className="">
          Studier indikerar att återkommande maniska episoder kan leda till
          förändringar i hjärnans struktur, såsom minskad tjocklek i
          hjärnbarken. Detta tyder på att bipolär sjukdom kan vara en
          neuroprogressiv sjukdom, där hjärnans struktur förändras över tid.
        </p>
      </div>
    </div>
  );
};

export default Genetics;
