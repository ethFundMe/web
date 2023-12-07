import { Generated } from 'kysely';

export interface UserTable {
  id: Generated<number>;
  eth_address: string;
  full_name: string;
}
