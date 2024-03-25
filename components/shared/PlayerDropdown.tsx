import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";
import { getAllUsers } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import Search from "./Search";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const PlayerDropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [newCategory, setNewCategory] = useState("");

  // const handleAddCategory = () => {
  //   createCategory({
  //     categoryName: newCategory.trim(),
  //   }).then((category) => {
  //     setUsers((prevState) => [...prevState, category]);
  //   });
  // };

  useEffect(() => {
    const getUsers = async () => {
      const userList = await getAllUsers();
      userList && setUsers(userList as IUser[]);
    };

    getUsers();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select Users" />
      </SelectTrigger>
      <SelectContent className="dark:bg-darkBlue_2">
        {users.length > 0 &&
          users.map((user) => (
            <SelectItem
              key={user.username}
              value={user._id}
              className="select-item p-regular-14 dark:text-white dark:hover:bg-lighteBlue_1"
            >
              {user.username}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500 dark:bg-darkBlue_2">
            Search for players
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white dark:bg-darkBlue_2">
            <AlertDialogHeader>
              <AlertDialogTitle>Search</AlertDialogTitle>
              <AlertDialogDescription>
                <Search />
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
              // onClick={() => startTransition(handleAddCategory)}
              >
                {/* Add */}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default PlayerDropdown;
