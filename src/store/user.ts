import { User } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
};

export const userStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser(user) {
        set(() => ({ user }));
      },
      resetUser() {
        set(() => ({ user: null }));
      },
    }),
    { name: 'efm_user' }
  )
);
