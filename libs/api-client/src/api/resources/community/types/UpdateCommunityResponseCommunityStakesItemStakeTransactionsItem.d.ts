/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../index';
export interface UpdateCommunityResponseCommunityStakesItemStakeTransactionsItem {
  transactionHash: string;
  communityId: string;
  stakeId?: number;
  address: string;
  stakeAmount: number;
  stakePrice?: string;
  stakeDirection: CommonApi.UpdateCommunityResponseCommunityStakesItemStakeTransactionsItemStakeDirection;
  timestamp: number;
}
