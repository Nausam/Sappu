import OnGoing from "@/components/shared/tournaments/OnGoing";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const tournamentsPage = () => {
  return (
    <>
      <section className="wrapper mt-28">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold drop-shadow-md">OnGoing Tournaments</h1>

            <p className="p-regular-20 md:p-regular-24 text-gray-700 dark:text-gray-300">
              Connect, Compete, and Conquer with Our Mobile Gaming Community.
            </p>
            <Button
              asChild
              className="button-modern hover:bg-cyan-500"
              size="lg"
            >
              <Link href="/shop">Details</Link>
            </Button>
          </div>

          <OnGoing />
        </div>
      </section>

      <section className="wrapper mt-28">
        <h2 className="h2-bold drop-shadow-md">
          Sappu <span className="text-red-500">Live</span>
        </h2>
        <div className="flex w-full h-[500px] max-w-5xl mx-auto border mt-10 rounded-lg items-center justify-center">
          <p className="p-regular-24">No live sessions going on...</p>
        </div>
      </section>
    </>
  );
};

export default tournamentsPage;
