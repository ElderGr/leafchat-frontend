import { User } from "@/app/domain/user/user.types";
import { ReactNode } from "react";

export interface UserProviderProps {
    children: ReactNode;
  }
  
export interface UserContextProps {
    selectedUser: User | null;
    userForm: boolean;
    deleteUserForm: boolean;
    openUserForm(user: User | null): void;
    closeUserForm(): void;
    openDeleteUserForm(user: User): void;
    closeDeleteUserForm(): void;
}

  