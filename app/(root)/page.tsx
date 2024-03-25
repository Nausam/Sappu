import Collection from "@/components/shared/Collection";
import { getAllTournaments } from "@/lib/actions/tournament.actions";
import { SearchParamProps } from "@/types";

import Hero from "@/components/main/Hero";
import AboutUs from "@/components/main/AboutUs";
import Faq from "@/components/main/Faq";
import Mastery from "@/components/main/Mastery";
import Youtube from "@/components/main/Youtube";
import Sponsor from "@/components/main/Sponsor";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const tournaments = await getAllTournaments({
    query: searchText,
    category: category,
    page,
    limit: 6,
  });

  return (
    <>
      <Hero />

      <section id="#upcoming_Tournaments">
        <div className="wrapper my-20 items-center flex flex-col gap-8 md:gap-12 ">
          <h2 className="h2-bold text-gray-800 dark:text-white mt-10">
            Upcoming Tournaments
          </h2>

          <Collection
            data={tournaments?.data}
            emptyTitle="No upcoming tournaments :("
            emptyStateSubtext="Come back later"
            collectionType="All_Products"
            limit={3}
            homePage={true}
            page={page}
            totalPages={tournaments?.totalPages}
          />
        </div>
      </section>

      <Mastery />
      <Youtube />
      <Sponsor />
      <Faq />
    </>
  );
}
