import { User } from '@/types';
import { create } from 'zustand';

type UserState = {
  user: User;
  setUser: (user: User) => void;
};

export const userStore = create<UserState>()((set) => ({
  user: {
    bio: '',
    campaigns: [],
    fundings: [],
    bannerUrl: '',
    createdAt: new Date(Date.now()),
    creatorFee: 0,
    email: '',
    ethAddress: '0x00',
    fullName: '',
    id: '',
    isBanned: false,
    isVerified: false,
    profileUrl: '',
    role: 'beneficiary',
    updatedAt: new Date(Date.now()),
  },
  setUser(user) {
    set(() => ({ user }));
  },
}));
