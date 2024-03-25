import { Metadata } from "next";
import React from "react";

import TeamForm from "@/components/shared/TeamForm";
import { auth } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Create | SAPPU",
};

const CreateTeam = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="mt-28">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Team
        </h3>
      </section>

      <div className="wrapper my-8">
        <TeamForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateTeam;
