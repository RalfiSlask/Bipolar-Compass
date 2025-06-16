import LinkWithArrow from '@/app/components/shared/links/LinkWithArrow';
import { FaBriefcase } from 'react-icons/fa';
import SectionTitle from '../../../shared/headings/SectionTitle';

const WorkRights = () => {
  return (
    <div className="content-container text-center sm:text-left">
      <SectionTitle icon={<FaBriefcase />}>
        Arbetsliv och rättigheter
      </SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary-light rounded-lg p-4 shadow-md">
          <h4 className="text-lg mb-2 text-primary-dark font-semibold">
            Diskrimineringslagen
          </h4>
          <p className="mb-4">
            Enligt Diskrimineringslagen (2008:567) är det förbjudet att
            diskriminera på grund av funktionsnedsättning, inklusive psykisk
            ohälsa. Detta gäller i:
          </p>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>Arbetslivet</li>
            <li>Utbildning</li>
            <li>Bostadsförmedling</li>
            <li>Vård och omsorg</li>
          </ul>
          <div className="mt-4">
            <LinkWithArrow
              link="https://www.do.se/diskriminerad/diskrimineringsgrunder/funktionsnedsattning-en-av-diskrimineringsgrunderna"
              text="Läs mer om diskriminering på DO:s hemsida"
              size="sm"
            />
          </div>
        </div>
        <div className="bg-primary-light rounded-lg p-4 shadow-md">
          <h4 className="text-lg mb-2 text-primary-dark font-semibold">
            Anpassningar i arbetet
          </h4>
          <p className="mb-4">
            Arbetsgivaren har skyldighet att göra anpassningar för att
            möjliggöra för dig att arbeta. Detta kan inkludera:
          </p>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>Anpassad arbetstid</li>
            <li>Flexibla raster</li>
            <li>Anpassat arbetsuppdrag</li>
            <li>Stöd från arbetsgivaren</li>
          </ul>
          <div className="mt-4">
            <LinkWithArrow
              link="https://www.forsakringskassan.se/halso-och-sjukvarden/sjukdom-och-skada/arbetslivsinriktad-rehabilitering"
              text="Läs mer om rehabilitering"
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkRights;
