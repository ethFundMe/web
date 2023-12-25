export type User = {
  name: string;
  creator: boolean;
  verifiedCreator: boolean;
  address?: `0x${string}`;
  displayImage: string;
};
