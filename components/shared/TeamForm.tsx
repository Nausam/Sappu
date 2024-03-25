"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { teamFormSchema } from "@/lib/validator";
import { teamDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import PlayerDropdown from "./PlayerDropdown";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createTeam } from "@/lib/actions/team.actions";
import { ITeam } from "@/lib/database/models/team.model";

import { Switch } from "@/components/ui/switch";
import { toast } from "../ui/use-toast";
import {
  createTournament,
  updateTournament,
} from "@/lib/actions/tournament.actions";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TeamFormProps = {
  userId: string;
  type: "Create" | "Update";
  team?: ITeam;
  teamId?: string;
};

const TeamForm = ({ userId, type, team, teamId }: TeamFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [productCounter, setProductCounter] = useState(0);

  const initialValues = team && type === "Update" ? team : teamDefaultValues;

  const { startUpload } = useUploadThing("imageUploader");

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof teamFormSchema>>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof teamFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) return;

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newTeam = await createTeam({
          team: {
            ...values,
            imageUrl: uploadedImageUrl,
          },
          userId,
          path: "/profile",
        });
        if (newTeam) {
          form.reset();
          // router.push(`/teams/${newTeam._id}`);
          router.push("/");
        }
        toast({
          title: `${values.name} created successfully`,
        });
      } catch (error) {
        toast({
          title: `Error creating ${values.name}`,
          variant: "destructive",
        });
      }
    }

    // if (type === "Update") {
    //   if (!tournamentId) {
    //     router.back();
    //     return;
    //   }

    //   try {
    //     const updatedTournament = await updateTournament({
    //       userId,
    //       tournament: {
    //         ...values,
    //         imageUrl: uploadedImageUrl,
    //         _id: tournamentId,
    //       },
    //       path: `/tournaments/${tournamentId}}`,
    //     });
    //     if (updatedTournament) {
    //       form.reset();
    //       router.push(`/tournaments/${updatedTournament._id}`);
    //     }
    //     toast({
    //       title: `${values.title} updated successfully`,
    //     });
    //   } catch (error) {
    //     toast({
    //       title: `Error updating ${values.title}`,
    //       variant: "destructive",
    //     });
    //   }
    // }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Team Name"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="moto"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Team Moto"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full dark:bg-darkBlue_2 rounded-full text-black">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row ">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="players"
            render={({ field }) => (
              <FormItem className="w-full dark:bg-darkBlue_2 rounded-full text-black">
                <FormControl>
                  <PlayerDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button-modern hover:bg-cyan-500"
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Team `}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TeamForm;
