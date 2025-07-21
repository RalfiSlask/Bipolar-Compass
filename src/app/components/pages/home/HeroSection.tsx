import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <>
      <div className="w-full min-h-[calc(100vh-130px)] flex relative mx-auto px-4 md:px-10 max-w-[1440px] z-20">
        <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-8 pb-10 md:gap-10 lg:py-0">
          <div className="flex-1 text-center lg:text-left z-10 lg:max-w-[600px] mt-20">
            <div className="flex flex-col animate-fadeIn bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <h2 className="text-3xl sm:text-4xl lg:text-3xl text-primary-dark font-bold leading-tight">
                Din digitala följeslagare för att hantera bipolär sjukdom
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-xl text-primary-dark max-w-2xl mt-2 md:mt-4">
                Bipolärkompassen erbjuder verktyg och stöd för att hjälpa dig
                hantera din vardag. Med din egna sida, kunskapsbank och senaste
                forskning står du aldrig ensam i din resa.
              </p>
              <Link
                href="/konto/logga-in"
                className="main-button w-fit mx-auto mt-6 md:mt-10 lg:mx-0 hover:scale-105 transition-transform"
              >
                <span className="button-border"></span>
                <span className="button-text">STARTA DIN RESA</span>
              </Link>
            </div>
          </div>

          <div className="w-full xl:w-3/4 flex items-center justify-center absolute right-0 top-0 h-full">
            <Image
              src="/images/home/laughing.webp"
              alt="testing"
              width={4910}
              height={3264}
              quality={80}
              priority={true}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      {/* Purple wavelike background svg */}
      <div className="w-full overflow-hidden relative z-10 -mt-[300px]">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-[300px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            fill="#F5F3FF"
            fillOpacity="1"
          />
        </svg>
      </div>
    </>
  );
};

export default HeroSection;
