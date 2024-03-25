import React from "react";
import { Metadata } from "next";

import TournamentForm from "@/components/shared/TournamentForm";
import { getTournamentById } from "@/lib/actions/tournament.actions";
import { auth } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Update | SAPPU",
};

type UpdateTournamentProps = {
  params: {
    id: string;
  };
};

const UpdateTournament = async ({ params: { id } }: UpdateTournamentProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const tournament = await getTournamentById(id);

  return (
    <>
      <section className="mt-20">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Tournament
        </h3>
      </section>

      <div className="wrapper my-8">
        <TournamentForm
          type="Update"
          userId={userId}
          tournament={tournament}
          tournamentId={tournament._id}
        />
      </div>
    </>
  );
};

export default UpdateTournament;
