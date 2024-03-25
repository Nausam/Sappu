"use server";

import {
  CreateTournamentParams,
  DeleteProductParams,
  GetAllTournamentsParams,
  GetProductsByUserParams,
  GetRelatedTournamentsByCategoryParams,
  UpdateTournamentParams,
} from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Tournament from "../database/models/tournament.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";
import Product from "../database/models/product.model";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateTournament = async (query: any) => {
  return query
    .populate({
      path: "creator",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "category",
      model: Category,
      select: "_id name",
    });
};

// CREATE
export const createTournament = async ({
  tournament,
  userId,
  path,
}: CreateTournamentParams) => {
  try {
    await connectToDatabase();

    const creator = await User.findById(userId);

    if (!creator) {
      throw new Error("Creator not found");
    }

    const newTournament = await Tournament.create({
      ...tournament,
      category: tournament.categoryId,
      creator: userId,
    });

    return JSON.parse(JSON.stringify(newTournament));
  } catch (error) {
    handleError(error);
  }
};

// UPDATE
export async function updateTournament({
  userId,
  tournament,
  path,
}: UpdateTournamentParams) {
  try {
    await connectToDatabase();

    const tournamentToUpdate = await Tournament.findById(tournament._id);
    if (
      !tournamentToUpdate ||
      tournamentToUpdate.creator.toHexString() !== userId
    ) {
      throw new Error("Unauthorized or product not found");
    }

    const updatedTournament = await Tournament.findByIdAndUpdate(
      tournament._id,
      { ...tournament, category: tournament.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedTournament));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE PRODUCT BY ID
export const getTournamentById = async (tournamentId: string) => {
  try {
    await connectToDatabase();

    const tournament = await populateTournament(
      Tournament.findById(tournamentId)
    );

    if (!tournament) {
      throw new Error("Tournamwnt not found");
    }

    return JSON.parse(JSON.stringify(tournament));
  } catch (error) {
    handleError(error);
  }
};

// GET ALL PRODUCTS
export const getAllTournaments = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllTournamentsParams) => {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;

    // const excludedProductCondition = "65e9d07d684eaf43ce92ee67"
    //   ? { _id: { $ne: "65e9d07d684eaf43ce92ee67" } }
    //   : {};

    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
        // excludedProductCondition,
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const tournamentQuery = Tournament.find(conditions)
      .sort({
        createdAt: "desc",
      })
      .skip(skipAmount)
      .limit(limit);

    const tournaments = await populateTournament(tournamentQuery);
    const tournamentsCount = await Product.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(tournaments)),
      totalPages: Math.ceil(tournamentsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

// GET RELATED PRODUCTS: PRODUCTS WITH SAME CATEGORY
export async function getRelatedTournamentsByCategory({
  categoryId,
  tournamentId,
  limit = 3,
  page = 1,
}: GetRelatedTournamentsByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: tournamentId } }],
    };

    const tournamentsQuery = Tournament.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const tournaments = await populateTournament(tournamentsQuery);
    const tournamentsCount = await Tournament.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(tournaments)),
      totalPages: Math.ceil(tournamentsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET TOURNAMENTS THAT HAVE STARTED
export const getStartedTournaments = async () => {
  try {
    await connectToDatabase();

    const startedTournaments = await Tournament.find({ hasStarted: true });
    return JSON.parse(JSON.stringify(startedTournaments));
  } catch (error) {
    handleError(error);
  }
};

// // DELETE
// export async function deleteProduct({ productId, path }: DeleteProductParams) {
//   try {
//     await connectToDatabase();

//     const deletedProduct = await Product.findByIdAndDelete(productId);
//     if (deletedProduct) revalidatePath(path);
//   } catch (error) {
//     handleError(error);
//   }
// }

// // GET PRODUCTS BY ORGANIZER
// export async function getProductsByUser({
//   userId,
//   limit = 6,
//   page,
// }: GetProductsByUserParams) {
//   try {
//     await connectToDatabase();

//     const conditions = { organizer: userId };
//     const skipAmount = (page - 1) * limit;

//     const productsQuery = Product.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const products = await populateProduct(productsQuery);
//     const productsCount = await Product.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(products)),
//       totalPages: Math.ceil(productsCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }
