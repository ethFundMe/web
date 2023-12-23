import { User } from '@/types';
import { create } from 'zustand';

type UserState = {
  user: User;
  setUser: (user: User) => void;
};

export const userStore = create<UserState>()((set) => ({
  user: {
    banner_url: '',
    created_at: new Date(Date.now()),
    creator_fee: 0,
    eth_address: '',
    full_name: '',
    id: '',
    is_banned: false,
    is_verified: false,
    profile_url: '',
    role: 'beneficiary',
    updated_at: new Date(Date.now()),
  },
  setUser(user) {
    set(() => ({ user }));
  },
}));
