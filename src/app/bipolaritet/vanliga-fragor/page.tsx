'use client';

import { faqItems } from '@/app/data/faqItems';
import { IFaqItem } from '@/app/types/faq';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const FAQPage = () => {
  const [questions, setQuestions] = useState<IFaqItem[]>(faqItems);

  const toggleOpen = (id: string) => {
    setQuestions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, open: !item.open } : item
      )
    );
  };

  return (
    <section className="w-full space-y-12 max-w-[1440px] px-4 md:px-10 pt-10 pb-20">
      <div className="w-full bg-primary-light text-primary-dark flex items-center shadow-sm rounded-lg justify-end px-10 py-10 gap-10">
        <div className="flex-1">
          <h2 className="h-lg font-bold mb-6">Frågor och svar</h2>
          <p className="text-xl text-primary-dark">
            Här har vi samlat de vanligaste frågorna om bipolär sjukdom. Du
            hittar svar på allt från grundläggande information om diagnosen till
            praktiska råd om behandling och vardagshantering. Varje svar
            innehåller länkar till fördjupad information på relevanta sidor på
            vår webbplats.
          </p>
        </div>
        <div className="flex-1 rounded-lg overflow-hidden w-full">
          <Image
            src="/images/faq.jpg"
            alt="frågor och svar"
            width={6000}
            height={3376}
            quality={100}
            aria-label="frågor och svar två händer som håller i ett frågetecken"
            className="object-cover aspect-[6000/3376] rounded-full"
            priority
          />
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((item, index) => (
          <motion.div
            initial={false}
            onClick={() => toggleOpen(item.id)}
            key={index}
            aria-expanded={item.open}
            aria-label={item.question}
            className="bg-white p-6 rounded-lg border border-primary-dark/20 shadow-sm cursor-pointer"
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold  text-primary-dark">
                {item.question}
              </h3>
              <motion.div
                animate={{ rotate: item.open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className=" p-2 rounded-full"
              >
                <IoIosArrowDown className="text-2xl text-primary-dark" />
              </motion.div>
            </div>

            <AnimatePresence>
              {item.open && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="text-gray-700 overflow-hidden"
                >
                  {item.answer}{' '}
                  {item.links &&
                    item.links.map((link, linkIndex) => (
                      <span key={linkIndex}>
                        <Link
                          href={link.href}
                          className="text-primary-dark font-bold relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary-dark after:transition-all after:duration-300 hover:after:w-full"
                        >
                          {link.text}
                        </Link>
                        {linkIndex < (item.links?.length ?? 0) - 1
                          ? ' och '
                          : ''}
                      </span>
                    ))}
                  {item.additionalText}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQPage;
