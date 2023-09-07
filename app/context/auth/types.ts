import { User } from '@/app/domain/user/user.types';
import { ReactNode } from 'react';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  session: string;
  user: User | null;
  handleSetSession: (data: string) => void;
  handleSetUser: (data: any) => void;
}

