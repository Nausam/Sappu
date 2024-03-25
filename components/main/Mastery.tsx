import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";

const Mastery = () => {
  return (
    <section className="wrapper flex flex-wrap gap-10 md:mt-32 mt-10 relative">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:gap-0 items-center justify-center ">
        <div className="lg:hidden flex-col justify-center gap-8 flex">
          <h2 className="h2-bold text-gray-800 dark:text-white text-start">
            Unleash Your Gaming Beast with Our Mobile Gaming Mastery
          </h2>
          <p className="p-regular-18 md:p-regular-20 text-gray-700 dark:text-gray-300 text-start">
            Unleash Your Inner Gaming Beast and Rise to the Top of Your Favorite
            Mobile Games with Sappu eSports Tournaments. Gain S points in every
            tournament and unlock free goodies in the upcoming tournaments. With
            our Mobile Gaming Mastery, You get the Tools You Need to Dominate
            Your Competitors and Achieve Gaming Greatness.
          </p>
          <Button size="lg" asChild className="button-modern hover:bg-cyan-500">
            <Link href="/product/65e9d07d684eaf43ce92ee67/custom">Sign up</Link>
          </Button>
        </div>

        <div className="mt-10 md:mt-0">
          <Image
            src="/assets/images/mastery.png"
            alt="hero"
            width={450}
            height={450}
            className="object-contain object-center mx-auto hidden md:block"
          />
          <Image
            src="/assets/images/mastery.png"
            alt="hero"
            width={450}
            height={450}
            className="object-contain object-center mx-auto md:hidden block"
          />
          <div className="absolute lg:top-0 md:top-64 top-[500px] right-0 lg:left-28 md:left-48 left-0 bottom-0 bg-cyan-500 h-[1000px] w-[800px]  rounded-full blur-3xl opacity-10 -z-50"></div>
        </div>

        <div className="flex-col justify-center gap-8 mt-16 hidden lg:flex">
          <h2 className="h2-bold text-gray-800 dark:text-white text-start">
            Unleash Your Gaming Beast with Our Mobile Gaming Mastery
          </h2>
          <p className="p-regular-18 md:p-regular-20 text-gray-700 dark:text-gray-300 text-start">
            Unleash Your Inner Gaming Beast and Rise to the Top of Your Favorite
            Mobile Games with Sappu eSports Tournaments. Gain S points in every
            tournament and unlock free goodies in the upcoming tournaments. With
            our Mobile Gaming Mastery, You get the Tools You Need to Dominate
            Your Competitors and Achieve Gaming Greatness.
          </p>
          <Button size="lg" asChild className="button-modern hover:bg-cyan-500">
            <Link href="/product/65e9d07d684eaf43ce92ee67/custom">Sign up</Link>
          </Button>
        </div>
      </div>

      {/* <div className="wrapper flex flex-wrap justify-center mx-auto text-center gap-20 mt-10">
        <div className="max-w-xl">
          <h2 className="h2-bold text-gray-800 dark:text-white">Our Mission</h2>
          <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 mt-5">
            Revolutionize snorkeling with fully customizable fins, enhancing
            adventure and performance.
          </p>
        </div>
        <div className="max-w-xl">
          <h2 className="h2-bold text-gray-800 dark:text-white">
            What Sets Us Apart
          </h2>
          <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 mt-5">
            Our state-of-the-art fin customizer lets you design the perfect
            fins, reflecting your style.
          </p>
        </div>

        <div className="max-w-xl">
          <h2 className="h2-bold text-gray-800 dark:text-white">
            Quality and Innovation
          </h2>
          <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 mt-5">
            Crafted with advanced materials for durability, comfort, and
            unmatched performance.
          </p>
        </div>

        <div className="max-w-xl">
          <h2 className="h2-bold text-gray-800 dark:text-white">
            Expert Craftsmanship
          </h2>
          <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 mt-5">
            Handcrafted by skilled artisans, ensuring excellence in every
            detail.
          </p>
        </div>
      </div> */}
      <Separator className="mt-10" />
    </section>
  );
};

export default Mastery;
