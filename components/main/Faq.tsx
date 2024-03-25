import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <section className="wrapper w-full my-20 items-center flex flex-col gap-8 md:mt-32 mt-10">
      <h2 className="h2-bold text-gray-800 dark:text-white">FAQ</h2>
      <Accordion type="single" collapsible>
        <AccordionItem
          className="sm:w-[600px] lg:w-[1250px] md:w-[700px] w-[330px]"
          value="item-1"
        >
          <AccordionTrigger className="p-regular-16 md:p-regular-20">
            Who are we?
          </AccordionTrigger>
          <AccordionContent className="p-regular-10 md:p-regular-16">
            You don't need to know.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="p-regular-16 md:p-regular-20">
            Where are we located?
          </AccordionTrigger>
          <AccordionContent className="p-regular-10 md:p-regular-16">
            None of your bussiness.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="p-regular-16 md:p-regular-20">
            What we do?
          </AccordionTrigger>
          <AccordionContent className="p-regular-10 md:p-regular-16">
            Piss off
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Faq;
