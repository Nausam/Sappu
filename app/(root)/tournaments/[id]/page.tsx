import { Metadata } from "next";

import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import { getRelatedTournamentsByCategory } from "@/lib/actions/tournament.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React, { Suspense } from "react";
import { auth } from "@clerk/nextjs";
import { getTournamentById } from "@/lib/actions/tournament.actions";

export const metadata: Metadata = {
  title: "Details | SAPPU",
};

const TournamentDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const tournament = await getTournamentById(id);

  const similarTournaments = await getRelatedTournamentsByCategory({
    categoryId: tournament.category._id,
    tournamentId: tournament._id,
    page: searchParams.page as string,
  });

  // Function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate: string = date.toLocaleDateString("en-US", options);
    return formattedDate.replace(
      /(\d+)(th|st|nd|rd)/,
      (_, day, suffix) => `${day}${suffix}`
    );
  };

  return (
    <>
      <section className="flex justify-center md:mt-16 mt-20">
        <div className="wrapper grid grid-cols-1 lg:grid-cols-2  2xl:max-w-7xl sm:py-10 items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <Image
              src={tournament.imageUrl}
              alt="hero image"
              width={500}
              height={300}
              style={{ objectFit: "cover" }}
              className="rounded-sm shadow-2xl shadow-cyan-700"
            />
          </Suspense>

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold"> {tournament.title} </h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  {/* <p className="p-bold-20 bg-grey-500/10 rounded-sm px-5 py-2">
                    {`$${tournament.prizePool}`}
                  </p> */}

                  <p className="p-medium-16 rounded-sm bg-gray-200 dark:bg-lighteBlue_1 px-4 py-2.5 dark:text-gray-300">
                    {tournament.category.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600 dark:text-gray-300">
                Description
              </p>

              <p className="p-medium-16 lg:p-medium-18 text-gray-500 dark:text-gray-400">
                {tournament.description}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600 dark:text-gray-300">
                Prize Money
              </p>

              <p className="p-medium-16 lg:p-medium-18 text-gray-500 dark:text-gray-400">
                MVR {tournament.prizePool}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600 dark:text-gray-300">
                Entry Free
              </p>

              <p className="p-medium-16 lg:p-medium-18 text-gray-500 dark:text-gray-400">
                MVR {tournament.entryFee}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600 dark:text-gray-300">
                Tournament Start Date
              </p>

              <p className="p-medium-16 lg:p-medium-18 text-gray-500 dark:text-gray-400">
                {formatDate(tournament.startDate)}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600 dark:text-gray-300">
                Tournament End Date
              </p>

              <p className="p-medium-16 lg:p-medium-18 text-gray-500 dark:text-gray-400">
                {formatDate(tournament.endDate)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper w-full">
        <div className="flex max-w-2xl">
          <div className="mt-5">REGISTER</div>
        </div>
      </section>

      <section className="wrapper my-8 flex-col gap-8 md:gap-12 mt-10">
        <h2 className="h2-bold">Similar Tournaments</h2>

        <div className="mt-10">
          <Collection
            data={similarTournaments?.data}
            emptyTitle="No similar tournaments ongoing..."
            emptyStateSubtext="Come back later"
            collectionType="All_Products"
            limit={3}
            page={searchParams.page as string}
            totalPages={similarTournaments?.totalPages}
          />
        </div>
      </section>
    </>
  );
};

export default TournamentDetails;
