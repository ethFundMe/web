import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './types';

type UserStoreType = {
  // user: User | null;
  user: User;
  updateUser: (user: User) => void;
  // logout: VoidFunction;
};

export const userStore = create<UserStoreType>()(
  persist(
    (set) => ({
      user: {
        name: 'John Doe',
        verifiedCreator: false,
        creator: true,
        displayImage: '/wallet-connect-logo.png',
      },
      updateUser: (user) => set(() => ({ user })),
      // logout: () => set(() => ({ user: null })),
    }),
    { name: 'userStore' }
  )
);
