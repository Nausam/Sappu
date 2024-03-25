import { Metadata } from "next";

import Collection from "@/components/shared/Collection";
import InventoryCollection from "@/components/shared/InventoryCollection";
import { Button } from "@/components/ui/button";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { getProductsByUser } from "@/lib/actions/product.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Profile | SAPPU",
};

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="wrapper mt-20">
        <h3 className="h3-bold text-center sm:text-left">Profile</h3>

        <div className="mt-5 flex items-center justify-center sm:justify-between">
          <Tabs defaultValue="my-profile">
            <TabsList className="dark:bg-lighteBlue_1">
              <TabsTrigger value="my-profile">My Profile</TabsTrigger>
              <TabsTrigger value="my-teams">My Teams</TabsTrigger>
            </TabsList>
            <TabsContent value="my-profile">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center">
                    Loading...
                  </div>
                }
              >
                <h1>MY PROFILE PAGE</h1>
              </Suspense>
            </TabsContent>
            <TabsContent value="my-teams">
              <h1>MY TEAMS PAGE</h1>
            </TabsContent>
          </Tabs>

          <Button asChild className="button-modern hover:bg-cyan-500" size="lg">
            <Link href="/teams/create">Create Team</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
