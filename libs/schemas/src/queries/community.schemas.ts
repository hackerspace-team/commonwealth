import {
  ChainBase,
  ChainNetwork,
  CommunityType,
  MAX_SCHEMA_INT,
  MIN_SCHEMA_INT,
} from '@hicommonwealth/shared';
import { z } from 'zod';
import {
  Community,
  CommunityMember,
  CommunityStake,
  ContestManager,
  ExtendedCommunity,
  MembershipRejectReason,
  PermissionEnum,
  PinnedTokenWithPrices,
  Topic,
} from '../entities';
import * as projections from '../projections';
import { PG_INT } from '../utils';
import { PaginatedResultSchema, PaginationParamsSchema } from './pagination';

export const GetCommunities = {
  input: PaginationParamsSchema.extend({
    // eslint-disable-next-line max-len
    relevance_by: z
      .enum(['tag_ids', 'membership'])
      .optional()
      .describe(
        '\n' +
          // eslint-disable-next-line max-len
          " - When 'tag_ids', results would be 'DESC' ordered based on the provided 'tag_ids' param, and wouldn't strictly include matching 'tag_ids'\n" +
          // eslint-disable-next-line max-len
          " - When 'memberships', results would be 'DESC' ordered, the communities with auth-user membership will come before non-membership communities\n",
      ),
    network: z.nativeEnum(ChainNetwork).optional(),
    base: z.nativeEnum(ChainBase).optional(),
    eth_chain_id: z.number().optional(),
    cosmos_chain_id: z.string().optional(),
    community_type: z.nativeEnum(CommunityType).optional(),
    // NOTE 8/7/24: passing arrays in GET requests directly is not supported.
    //    Instead we support comma-separated strings of ids.
    tag_ids: z
      .preprocess((value) => {
        if (typeof value === 'string') {
          return value.split(',').map((id) => id.trim());
        }
        return value;
      }, z.array(z.coerce.number().positive()))
      .optional(),
    include_node_info: z.boolean().optional(),
    stake_enabled: z.boolean().optional(),
    has_groups: z.boolean().optional(),
    include_last_30_day_thread_count: z.boolean().optional(),
    order_by: z
      .enum([
        'created_at',
        'profile_count',
        'lifetime_thread_count',
        'last_30_day_thread_count',
        // TODO: https://github.com/hicommonwealth/commonwealth/issues/9694 add price and market cap options
      ])
      .optional(),
    order_direction: z.enum(['ASC', 'DESC']).optional(),
  }).refine(
    (data) => {
      // order_by can't be 'last_30_day_thread_count' if 'include_last_30_day_thread_count' is falsy
      if (
        !data.include_last_30_day_thread_count &&
        data.order_by === 'last_30_day_thread_count'
      ) {
        return false; // fail validation
      }

      // pass validation
      return true;
    },
    {
      message:
        "'order_by' cannot be 'last_30_day_thread_count' when 'include_last_30_day_thread_count' is not specified",
    },
  ),
  output: PaginatedResultSchema.extend({
    results: Community.extend({
      last_30_day_thread_count: PG_INT.optional().nullish(),
    }).array(),
  }),
};

export const GetCommunity = {
  input: z.object({
    id: z.string(),
    include_node_info: z.boolean().optional(),
    include_groups: z.boolean().optional(),
  }),
  output: z.union([ExtendedCommunity, z.undefined()]),
};

export const GetMemberships = {
  input: z.object({
    community_id: z.string(),
    address: z.string(),
    topic_id: z.number().optional(),
  }),
  output: z
    .object({
      groupId: z.number(),
      topics: z
        .object({
          id: z.number(),
          permissions: z.array(z.nativeEnum(PermissionEnum)),
        })
        .array(),
      isAllowed: z.boolean(),
      rejectReason: MembershipRejectReason,
    })
    .array(),
};

export const GetCommunityStake = {
  input: z.object({
    community_id: z.string(),
    stake_id: z.coerce
      .number()
      .int()
      .min(MIN_SCHEMA_INT)
      .max(MAX_SCHEMA_INT)
      .optional()
      .describe('The stake id or all stakes when undefined'),
  }),
  output: CommunityStake.optional(),
};

export const GetCommunityMembers = {
  input: PaginationParamsSchema.extend({
    search: z.string().optional(),
    community_id: z.string(),
    include_roles: z.boolean().optional(),
    memberships: z
      .union([
        z.literal('in-group'),
        z.string().regex(/^in-group:\d+$/, 'in-group with a number'),
        z.literal('not-in-group'),
        z.literal('allow-specified-addresses'),
        z.literal('not-allow-specified-addresses'),
      ])
      .optional(),
    include_group_ids: z.coerce.boolean().optional(),
    include_stake_balances: z.coerce.boolean().optional(),
    allowedAddresses: z.string().optional(),
    order_by: z
      .enum(['last_active', 'name', 'referrals', 'earnings'])
      .optional(),
  }),
  output: PaginatedResultSchema.extend({
    results: CommunityMember.array(),
  }),
};

export const GetTransactions = {
  input: z.object({
    addresses: z.string().optional(),
  }),
  output: z
    .object({
      transaction_category: z.enum(['stake', 'launchpad']),
      transaction_type: z.enum(['buy', 'sell']),
      transaction_hash: z.string(),
      address: z.string(),
      price: z.number(),
      amount: z.union([z.string(), PG_INT]),
      timestamp: PG_INT,
      community: z.object({
        id: z.string(),
        default_symbol: z.string().nullish(),
        icon_url: z.string().nullish(),
        name: z.string(),
        chain_node_id: PG_INT.nullish(),
        chain_node_name: z.string().nullish(),
      }),
    })
    .array(),
};

export const GetStakeHistoricalPrice = {
  input: z.object({
    past_date_epoch: z.number().min(1),
    community_id: z.string().optional(),
    stake_id: PG_INT.default(2),
  }),
  output: z
    .object({
      community_id: z.string(),
      old_price: z.string().nullish(),
    })
    .array(),
};

export const ConstestManagerView = ContestManager.extend({
  created_at: z.string(),
  deleted_at: z.string().nullish(),
  topics: z.undefined(),
  contests: z.undefined(),
  content: z.array(
    projections.ContestAction.extend({
      cast_deleted_at: z.string().nullish(),
      created_at: z.string(),
    }),
  ),
});

export const TopicView = Topic.extend({
  created_at: z.string().nullish(),
  updated_at: z.string().nullish(),
  deleted_at: z.string().nullish(),
  archived_at: z.string().nullish(),
  contest_topics: z.undefined(),
  total_threads: z.number().default(0),
  active_contest_managers: z.array(ConstestManagerView).optional(),
  allow_tokenized_threads: z.boolean().optional(),
  chain_node_id: z.number().nullish().optional(),
  chain_node_url: z.string().nullish().optional(),
  eth_chain_id: z.number().nullish().optional(),
});

export const GetTopics = {
  input: z.object({
    community_id: z.string(),
    with_contest_managers: z.boolean().optional(),
    with_archived_topics: z.boolean().optional(),
  }),
  output: z.array(TopicView),
};

export const GetTopicById = {
  input: z.object({
    topic_id: z.number(),
  }),
  // TODO: fix type
  output: z.any(),
};

export const GetPinnedTokens = {
  input: z.object({
    community_ids: z.string(),
    with_chain_node: z.boolean().optional(),
    with_price: z.boolean().optional(),
  }),
  output: PinnedTokenWithPrices.array(),
};
