export interface User {
  bannerUrl: string | null;
  createdAt: Date;
  creatorFee: number;
  email: string;
  ethAddress: string;
  fullName: string;
  id: string;
  isBanned: boolean;
  isVerified: boolean;
  profileUrl: string | null;
  role: 'beneficiary';
  updatedAt: Date;
}
