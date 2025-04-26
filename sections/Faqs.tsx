'use client';
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/motion-primitives/accordion';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Faqs = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-transparent px-4 py-16">
      <div className="w-full max-w-3xl">
        
        <motion.h1
          className="text-center text-white text-4xl md:text-5xl mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        >
          Faqs will be here 👇
        </motion.h1>

        {/* Forced spacing */}
        <div className="h-16 sm:h-20 md:h-24"></div>

        {/* Whole accordion now appears separately */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          <Accordion className="w-full space-y-8">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <AccordionItem value={`item-${faq.id}`} className="border-b border-gray-700">
                  <AccordionTrigger className="text-white text-lg sm:text-xl py-4 w-full flex justify-between items-center gap-4">
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1 text-left">
                      {faq.question}
                    </span>
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </AccordionTrigger>
                  <AccordionContent className="overflow-hidden">
                    <motion.div
                      className="py-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                    >
                      <motion.p
                        className="text-neutral-400 text-base leading-relaxed"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

const faqData = [
  {
    id: 1,
    question: 'Is an axiom just a rule?',
    answer: 'No. an axiom isn’t a rule you follow; it’s a truth you trust. It’s not created by authority but recognized by reason. It exists before the rules even begin.'
  },
  {
    id: 2,
    question: 'How do axioms shape everything we build?',
    answer: 'Axioms are the invisible pillars beneath every structure. They don’t scream for attention — they quietly hold the weight of logic, creativity, and invention without ever needing to be questioned.'
  },
  {
    id: 3,
    question: 'Can something be powerful if it’s unprovable?',
    answer: 'Yes. that’s the paradox of an axiom. Its strength comes from being self-evident, not proven. The greatest systems rest on the quiet confidence of these unprovable beginnings.'
  }
];

export default Faqs;