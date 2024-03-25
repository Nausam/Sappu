import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";

const Youtube = () => {
  return (
    <section className="wrapper flex flex-wrap gap-10 md:mt-32 mt-20">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:gap-0 items-center justify-center">
        <div className="lg:hidden flex-col justify-center gap-8 flex">
          <h2 className="h2-bold text-gray-800 dark:text-white text-start">
            Youtube Channel
          </h2>
          <p className="p-regular-18 md:p-regular-20 text-gray-700 dark:text-gray-300 text-start">
            Join the Action and Stay Ahead of the Game: Get the Latest Mobile
            Gaming Strategies, Tips, and Tournament Highlights on Our Channel,
            Where We Deliver Engaging and Informative Content to Help You Master
            Your Favorite Games.
          </p>
          <Button size="lg" asChild className="button-modern hover:bg-cyan-500">
            <Link href="/product/65e9d07d684eaf43ce92ee67/custom">Youtube</Link>
          </Button>
        </div>

        <div className="flex-col justify-center gap-8 mt-16 hidden lg:flex">
          <h2 className="h2-bold text-gray-800 dark:text-white text-start">
            Youtube Channel
          </h2>
          <p className="p-regular-18 md:p-regular-20 text-gray-700 dark:text-gray-300 text-start">
            Join the Action and Stay Ahead of the Game: Get the Latest Mobile
            Gaming Strategies, Tips, and Tournament Highlights on Our Channel,
            Where We Deliver Engaging and Informative Content to Help You Master
            Your Favorite Games.
          </p>
          <Button size="lg" asChild className="button-modern hover:bg-cyan-500">
            <Link href="/product/65e9d07d684eaf43ce92ee67/custom">Youtube</Link>
          </Button>
        </div>
        <div className="mt-10 md:mt-0">
          <Image
            src="/assets/images/youtube.png"
            alt="hero"
            width={450}
            height={450}
            className="object-contain object-center mx-auto hidden md:block rounded-md"
          />
          <Image
            src="/assets/images/youtube.png"
            alt="hero"
            width={450}
            height={450}
            className="object-contain object-center mx-auto md:hidden block rounded-md"
          />
        </div>
      </div>
      <Separator className="mt-10" />
    </section>
  );
};

export default Youtube;
