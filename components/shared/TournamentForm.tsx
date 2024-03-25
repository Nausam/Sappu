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
import { tournamentFormSchema } from "@/lib/validator";
import { productDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { ITournament } from "@/lib/database/models/tournament.model";

import { Switch } from "@/components/ui/switch";
import { toast } from "../ui/use-toast";
import {
  createTournament,
  updateTournament,
} from "@/lib/actions/tournament.actions";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TournamentFormProps = {
  userId: string;
  type: "Create" | "Update";
  tournament?: ITournament;
  tournamentId?: string;
};

const TournamentForm = ({
  userId,
  type,
  tournament,
  tournamentId,
}: TournamentFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [productCounter, setProductCounter] = useState(0);

  const initialValues =
    tournament && type === "Update"
      ? {
          ...tournament,
          startDate: new Date(tournament.startDate),
          endDate: new Date(tournament.endDate),
        }
      : productDefaultValues;

  const { startUpload } = useUploadThing("imageUploader");

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof tournamentFormSchema>>({
    resolver: zodResolver(tournamentFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof tournamentFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) return;

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newTournament = await createTournament({
          tournament: {
            ...values,
            imageUrl: uploadedImageUrl,
          },
          userId,
          path: "/profile",
        });
        if (newTournament) {
          form.reset();
          router.push(`/tournaments/${newTournament._id}`);
        }
        toast({
          title: `${values.title} created successfully`,
        });
      } catch (error) {
        toast({
          title: `Error creating ${values.title}`,
          variant: "destructive",
        });
      }
    }

    if (type === "Update") {
      if (!tournamentId) {
        router.back();
        return;
      }

      try {
        const updatedTournament = await updateTournament({
          userId,
          tournament: {
            ...values,
            imageUrl: uploadedImageUrl,
            _id: tournamentId,
          },
          path: `/tournaments/${tournamentId}}`,
        });
        if (updatedTournament) {
          form.reset();
          router.push(`/tournaments/${updatedTournament._id}`);
        }
        toast({
          title: `${values.title} updated successfully`,
        });
      } catch (error) {
        toast({
          title: `Error updating ${values.title}`,
          variant: "destructive",
        });
      }
    }
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
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Tournament title"
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
            name="prizePool"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-sm bg-grey-50 dark:bg-lighteBlue_1 px-4 py-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="price"
                      width={24}
                      height={24}
                    />
                    <Input
                      type="number"
                      placeholder="Prize Pool"
                      {...field}
                      className="p-regular-16 border-0 bg-grey-50 dark:bg-lighteBlue_1 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entryFee"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-sm bg-grey-50 dark:bg-lighteBlue_1 px-4 py-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="price"
                      width={24}
                      height={24}
                    />
                    <Input
                      type="number"
                      placeholder="Entry Fee"
                      {...field}
                      className="p-regular-16 border-0 bg-grey-50 dark:bg-lighteBlue_1 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-sm bg-grey-50 dark:bg-lighteBlue_1 px-4 py-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="price"
                      width={24}
                      height={24}
                    />
                    <p className="ml-3 whitespace-nowrap "> Start Date:</p>

                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat={"MM/dd/yyyy h:mm aa"}
                      wrapperClassName="datePicker"
                      className="cursor-pointer"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-sm bg-grey-50 dark:bg-lighteBlue_1 px-4 py-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="price"
                      width={24}
                      height={24}
                    />
                    <p className="ml-3 whitespace-nowrap "> End Date:</p>

                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat={"MM/dd/yyyy h:mm aa"}
                      wrapperClassName="datePicker"
                      className="cursor-pointer"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="hasStarted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-sm bg-grey-50 dark:bg-lighteBlue_1 p-3 shadow-sm max-w-sm">
              <div className="space-y-0.5">
                <FormLabel>Has tournament Started?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white  font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg"
          >
            {form.formState.isSubmitting
              ? "Submitting..."
              : `${type} Tournament `}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TournamentForm;
