import { Community } from '@hicommonwealth/schemas';
import { ChainBase, ChainNetwork, CommunityType } from '@hicommonwealth/shared';
import {
  BASE_ID,
  BLAST_ID,
  POLYGON_ETH_CHAIN_ID,
} from 'views/components/CommunityInformationForm/constants';
import { z } from 'zod';
import { CommunitySortDirections, CommunitySortOptions } from './types';

export const communityBases = {
  Cosmos: ChainBase.CosmosSDK,
  Ethereum: ChainBase.Ethereum,
  Solana: ChainBase.Solana,
};

export const communityChains = {
  Base: parseInt(BASE_ID),
  Polygon: POLYGON_ETH_CHAIN_ID,
  Blast: parseInt(BLAST_ID),
};

export const communityTypes = Object.keys(CommunityType) as CommunityType[];

const getPickedKeys = (schema: z.AnyZodObject) => {
  return Object.keys(schema.shape);
};

export const communitySortOptionsLabelToKeysMap = {
  // this would correctly throw TS errors if the community schema removes the specified keys
  [CommunitySortOptions.MostRecent]: getPickedKeys(
    Community.pick({ created_at: true }),
  )[0],
  [CommunitySortOptions.MarketCap]: 'market_cap', // this field doesn't exist on the tokens schema = hardcoding string
  [CommunitySortOptions.Price]: 'price', // this field doesn't exist on the tokens schema = hardcoding string
  [CommunitySortOptions.MemberCount]: getPickedKeys(
    Community.pick({ profile_count: true }),
  )[0],
  [CommunitySortOptions.ThreadCount]: getPickedKeys(
    Community.pick({ lifetime_thread_count: true }),
  )[0],
};

export const sortOrderLabelsToDirectionsMap = {
  [CommunitySortDirections.Ascending]: 'ASC',
  [CommunitySortDirections.Descending]: 'DESC',
};

export const communityNetworks: string[] = Object.keys(ChainNetwork)
  .filter((val) =>
    [
      'ArbitrumMainnet',
      'Arthera',
      'Avalanche',
      'Base',
      'Blast',
      'BSC',
      'Celo',
      'Core',
      'ERC20',
      'EthereumMainnet',
      'Fantom',
      'FuseMainnet',
      'Gnosis',
      'Harmony',
      'HorizenEON',
      'Linea',
      'Optimism',
      'Polygon',
      'Soneium',
    ].includes(val),
  )
  .sort((a, b) => a.localeCompare(b));
