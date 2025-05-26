'use client';

import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedContent from '@/app/components/shared/RelatedContent';
import { faqItems } from '@/app/data/faqItems';
import { faqIntro } from '@/app/data/pageIntros';
import { IFaqItem } from '@/app/types/faq';
import { AnimatePresence, motion } from 'framer-motion';
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
    <section className="page-section">
      <PageIntroContainer intro={faqIntro} />

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
      <RelatedContent currentPage="vanliga-fragor" />
    </section>
  );
};

export default FAQPage;
