import { Suspense } from "react";
import { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Explore | SAPPU",
};

const explorePage = () => {
  return (
    <div className="wrapper mt-20">
      <Tabs defaultValue="players">
        <TabsList className="dark:bg-lighteBlue_1">
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="players">
          <Suspense
            fallback={
              <div className="flex items-center justify-center">Loading...</div>
            }
          >
            <h1>PLAYERS PAGE</h1>
          </Suspense>
        </TabsContent>
        <TabsContent value="teams">
          <h1>TEAMS PAGE</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default explorePage;
