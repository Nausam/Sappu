"use client";
import React, { useEffect, useState } from "react";
import OnGoingCard from "./OnGoingCard";
import { getStartedTournaments } from "@/lib/actions/tournament.actions";
import Link from "next/link";
import { ITournament } from "@/lib/database/models/tournament.model";

const OnGoing = () => {
  const [tournaments, setTournaments] = useState<ITournament[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStartedTournaments();
        setTournaments(data);
      } catch (error) {
        console.error("Error fetching started tournaments:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center gap-10 justify-center mx-auto">
      {tournaments.length === 0 ? (
        <p>No ongoing tournaments at the moment.</p>
      ) : (
        tournaments.map((tournament) => (
          <Link href={`/tournaments/${tournament._id}`} key={tournament._id}>
            <OnGoingCard imageUrl={tournament.imageUrl} />
          </Link>
        ))
      )}
    </div>
  );
};

export default OnGoing;
