import Image from 'next/image';
import ContactForm from '../components/pages/contact/ContactForm';

const ContactPage = () => {
  return (
    <section className="bg-tertiary-light w-full text-tertiary-dark flex justify-center py-4 sm:py-10">
      <div className="max-w-[1440px] px-4 md:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col gap-6">
            <div className="w-full lg:max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">Kontakta oss</h2>
              <p className="text-lg text-tertiary-dark mb-4">
                Vi värdesätter din feedback och är här för att hjälpa dig.
                Oavsett om du har frågor om våra tjänster, vill diskutera ett
                potentiellt samarbete eller bara vill säga hej - tveka inte att
                höra av dig.
              </p>
              <p className="text-lg text-tertiary-dark font-semibold">
                Vårt team strävar efter att svara på alla förfrågningar inom 72
                timmar under vardagar. Vi ser fram emot att höra från dig och
                hjälpa dig på bästa möjliga sätt.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full lg:max-w-2xl rounded-lg overflow-hidden">
              <Image
                src="/images/contact.webp"
                alt="Contact"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
                priority
              />
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
              <h3 className="text-2xl font-semibold mb-6">Skicka meddelande</h3>
              <div className="flex-1">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
