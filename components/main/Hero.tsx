"use client";

import { Suspense } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="wrapper mt-28 relative">
      <div className="w-full text-center">
        <h1 className="h1 mb-6 max-w-5xl mx-auto">
          <span className="text-cyan-500 drop-shadow-lg">Revolutionizing </span>
          Maldivian Esports, Redefining Gaming Culture.
        </h1>

        <p className="p-regular-18 md:p-regular-20 max-w-3xl mx-auto mb-6  lg:mb-8">
          Connect, Compete, and Conquer with Our Mobile Gaming Community.
        </p>

        {/* <div className="absolute md:-top-60 -top-[500px] right-0 lg:left-40 md:left-28 -left-32 bottom-0 bg-blue-500 h-[500px] w-[800px]  rounded-full blur-3xl opacity-10 -z-50"></div> */}

        <Button asChild className="button-modern hover:bg-cyan-500" size="lg">
          <Link href="/shop">Get Started</Link>
        </Button>
      </div>

      <div className="flex w-full justify-center items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <Image
            src="/assets/images/hero.png"
            width={850}
            height={850}
            alt="hero image"
            className="mt-28"
          />
        </Suspense>
      </div>
    </section>
  );
};

export default Hero;
