import { Suspense } from "react";
import { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllOrders from "@/components/shared/AllOrders";
import CreateTournament from "@/components/shared/CreateTournament";

export const metadata: Metadata = {
  title: "ADMIN | SAPPU",
};

const AdminPage = () => {
  return (
    <div className="wrapper mt-20">
      <Tabs defaultValue="orders">
        <TabsList className="dark:bg-lighteBlue_1">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <Suspense
            fallback={
              <div className="flex items-center justify-center">Loading...</div>
            }
          >
            <AllOrders />
          </Suspense>
        </TabsContent>
        <TabsContent value="create">
          <CreateTournament />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
