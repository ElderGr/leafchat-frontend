import { User } from '@/app/domain/user/user.types';
import { createContext, useContext, useState } from 'react';
import { UserProviderProps, UserContextProps } from './types';

const UserContext = createContext({} as UserContextProps)

function UserProvider(props: UserProviderProps) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [userForm, setUserForm] = useState(false)
    const [deleteUserForm, setDeleteUserForm] = useState(false)


    const openUserForm = (user: User | null) => {
        setSelectedUser(user)
        setUserForm(true)
    }

    const closeUserForm = () => {
        setSelectedUser(null)
        setUserForm(false)
    }

    const openDeleteUserForm = (user: User) => {
        setSelectedUser(user)
        setDeleteUserForm(true)
    }

    const closeDeleteUserForm = () => {
        setSelectedUser(null)
        setDeleteUserForm(false)
    }

    return (
        <UserContext.Provider value={{ 
            selectedUser,
            userForm,
            deleteUserForm,
            openUserForm,
            closeUserForm,
            openDeleteUserForm,
            closeDeleteUserForm
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
  return useContext(UserContext);
}

export default UserProvider;
