import { CampaignsTable } from './campaign';

export interface Database {
  campaigns: CampaignsTable;
}

export * from './campaign';
