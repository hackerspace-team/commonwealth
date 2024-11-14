import { z } from 'zod';
import { Token } from '../entities';
import { PaginatedResultSchema, PaginationParamsSchema } from './pagination';

export const TokenView = Token.extend({
  initial_supply: z.string(),
  launchpad_liquidity: z.string(),
});

export const GetTokens = {
  input: PaginationParamsSchema.extend({
    search: z.string().optional(),
    order_by: z.enum(['name']).optional(),
  }),
  output: PaginatedResultSchema.extend({
    results: TokenView.extend({ community_id: z.string() }).array(),
  }),
};
