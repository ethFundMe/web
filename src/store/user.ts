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

export const efmUserAddressStore = create<{
  address: string | null;
  setAddress: (address: string) => void;
  resetAddress: () => void;
}>()(
  persist(
    (set) => ({
      address: null,
      setAddress(address) {
        set(() => ({ address }));
      },
      resetAddress() {
        set(() => ({ address: null }));
      },
    }),
    { name: 'efm_user_address' }
  )
);
