import { create } from 'zustand';
import { User } from './types';

type UserStoreType = {
  user: User;
};

export const useUserStore = create<UserStoreType>(() => ({
  user: { name: 'John Doe', verifiedCreator: false, creator: true },
}));
