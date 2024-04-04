import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SelectSeparator } from "../ui/select";

const Sponsor = () => {
  return (
    <section className="wrapper flex flex-wrap gap-10 md:mt-28 mt-10 relative">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:gap-0 items-center justify-center ">
        <div className="lg:hidden flex-col justify-center gap-8 flex">
          <h2 className="h2-bold text-gray-800 dark:text-white text-start">
            Sponsorship
          </h2>
          <p className="p-regular-18 md:p-regular-20 text-gray-700 dark:text-gray-300 text-start">
            At Sappu esports, we understand the importance of partnerships with
            top-tier sponsors. Sponsors not only provide valuable resources and
            support for our community, but they also help us bring exciting new
            opportunities to our players. That's why we are committed to
            partnering with leading brands in the gaming industry to bring the
            best possible experience to our audience. In this sponsors section,
            you'll find information on our current sponsors, learn about the
            benefits of sponsorship, and hear from our satisfied partners. We
            believe that through strong partnerships with sponsors, we can
            continue to build and grow our community, and bring new levels of
            excitement and engagement to Sappu esports.
          </p>
          <div className="flex gap-5">
            <Button
              size="lg"
              asChild
              className="button-modern hover:bg-cyan-500"
            >
              <Link href="/product/65e9d07d684eaf43ce92ee67/custom">
                Become a Sponsor
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="button-modern hover:bg-cyan-500"
            >
              <Link href="/product/65e9d07d684eaf43ce92ee67/custom">Info</Link>
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <Image
            src="/assets/images/sponsor.png"
            alt="hero"
            width={400}
            height={400}
            className="object-contain object-center mx-auto hidden md:block"
          />
          <Image
            src="/assets/images/sponsor.png"
            alt="hero"
            width={400}
            height={400}
            className="object-contain object-center mx-auto md:hidden block"
          />
        </div>

        {/* <div className="absolute lg:top-0 md:top-64 top-[500px] right-0 lg:left-96 md:left-48 left-0 bottom-0 bg-blue-500 h-[1000px] w-[800px]  rounded-full blur-3xl opacity-10 -z-50"></div> */}

        <div className="flex-col justify-center gap-8 mt-16 hidden lg:flex">
          <h2 className="h2-bold text-gray-800 dark:text-white text-start">
            Sponsorship
          </h2>
          <p className="p-regular-18 md:p-regular-20 text-gray-700 dark:text-gray-300 text-start">
            At Sappu esports, we understand the importance of partnerships with
            top-tier sponsors. Sponsors not only provide valuable resources and
            support for our community, but they also help us bring exciting new
            opportunities to our players. That's why we are committed to
            partnering with leading brands in the gaming industry to bring the
            best possible experience to our audience. In this sponsors section,
            you'll find information on our current sponsors, learn about the
            benefits of sponsorship, and hear from our satisfied partners. We
            believe that through strong partnerships with sponsors, we can
            continue to build and grow our community, and bring new levels of
            excitement and engagement to Sappu esports.
          </p>
          <div className="flex gap-5">
            <Button
              size="lg"
              asChild
              className="button-modern hover:bg-cyan-500"
            >
              <Link href="/product/65e9d07d684eaf43ce92ee67/custom">
                Become a Sponsor
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="button-modern hover:bg-cyan-500"
            >
              <Link href="/product/65e9d07d684eaf43ce92ee67/custom">Info</Link>
            </Button>
          </div>
        </div>
      </div>
      <SelectSeparator className="mt-10" />
    </section>
  );
};

export default Sponsor;
