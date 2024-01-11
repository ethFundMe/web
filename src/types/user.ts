export interface User {
  id: string;
  ethAddress: string;
  fullName: string;
  email: string;
  role: 'beneficiary' | 'creator' | 'admin';
  isBanned: boolean;
  isVerified: boolean;
  creatorFee: number;
  profileUrl: string | null;
  bannerUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
