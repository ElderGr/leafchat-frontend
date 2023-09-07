import { User } from '@/app/domain/user/user.types';
import { createContext, useContext, useEffect, useState } from 'react';
import { authGetStorage, authGetUser, authSetStorage, authSetUser } from './auth.storage';
import { AuthProviderProps, AuthContextProps } from './types';

const AuthContext = createContext({} as AuthContextProps)

function AuthProvider(props: AuthProviderProps) {
    const [session, setSession] = useState<string>('');
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        getSession()
        getUser()
    }, [])

    async function getSession() {
      setSession(authGetStorage())
    }

    async function getUser() {
      setUser(authGetUser())
    }

    async function handleSetSession(session: string) {
      setSession(session)
      authSetStorage(session)
    } 

    async function handleSetUser(user: any) {
      setUser(user)
      authSetUser(user)
    }

  return (
    <AuthContext.Provider value={{ session, user, handleSetSession, handleSetUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthProvider;
