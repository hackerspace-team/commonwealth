import { ChainBase, Roles } from '@hicommonwealth/shared';
import { ZodType, z } from 'zod';
import { Referral, ReferralFees, User } from '../entities';
import { Tags } from '../entities/tag.schemas';
import { UserProfile } from '../entities/user.schemas';
import { XpLog } from '../entities/xp.schemas';
import { PG_INT } from '../utils';
import { PaginatedResultSchema, PaginationParamsSchema } from './pagination';
import { AddressView, CommentView, ThreadView } from './thread.schemas';

export const UserProfileAddressView = AddressView.extend({
  Community: z.object({
    id: z.string(),
    base: z.nativeEnum(ChainBase),
    ss58_prefix: PG_INT.nullish(),
  }),
});

// Type annotation is needed to avoid:
// The inferred type of this node exceeds the maximum length the compiler will serialize.
// An explicit type annotation is needed.ts(7056)
type UserProfileAddressView = z.infer<typeof UserProfileAddressView>;

export const UserProfileView = z.object({
  userId: PG_INT,
  profile: UserProfile,
  totalUpvotes: z.number().int(),
  addresses: z.array(UserProfileAddressView) as ZodType<
    UserProfileAddressView[]
  >,
  threads: z.array(ThreadView),
  comments: z.array(CommentView),
  commentThreads: z.array(ThreadView),
  isOwner: z.boolean(),
  tags: z.array(Tags.extend({ id: PG_INT })),
  xp_points: z.number().int(),
});

export const GetUserProfile = {
  input: z.object({
    userId: PG_INT.optional(),
  }),
  output: UserProfileView,
};

export const GetUser = {
  input: z.object({}),
  output: z.union([User, z.object({})]),
};

export const SearchUserProfilesView = z.object({
  user_id: PG_INT,
  profile_name: z.string(),
  avatar_url: z.string().nullish(),
  created_at: z.date().or(z.string()),
  last_active: z.date().or(z.string()).nullish(),
  addresses: z.array(
    z.object({
      id: PG_INT,
      community_id: z.string(),
      address: z.string(),
      role: z.enum(Roles),
    }),
  ),
});

export const SearchUserProfiles = {
  input: PaginationParamsSchema.extend({
    search: z.string(),
    community_id: z.string().optional(),
    order_by: z
      .enum(['last_active', 'created_at', 'profile_name', 'rank'])
      .optional(),
  }),
  output: PaginatedResultSchema.extend({
    results: z.array(SearchUserProfilesView),
  }),
};

export const GetUserAddresses = {
  input: z.object({
    communities: z.string(),
    addresses: z.string(),
  }),
  output: z.array(
    z.object({
      userId: z.number(),
      name: z.string(),
      address: z.string(),
      lastActive: z.date().or(z.string()),
      avatarUrl: z.string().nullish(),
    }),
  ),
};

export const ReferralView = Referral.extend({
  referee_user_id: PG_INT,
  referee_profile: UserProfile,
});

export const GetUserReferrals = {
  input: z.object({ user_id: PG_INT.optional() }),
  output: z.array(ReferralView),
};

export const ReferralFeesView = ReferralFees;

export const GetUserReferralFees = {
  input: z.object({}),
  output: z.array(ReferralFeesView),
};

export const XpLogView = XpLog.extend({
  user_profile: UserProfile,
  creator_profile: UserProfile.nullish(),
  quest_id: PG_INT.nullish(),
  quest_action_meta_id: PG_INT.nullish(),
});

export const GetXps = {
  input: z.object({
    user_id: PG_INT.optional().describe('Filters events by user id'),
    community_id: z
      .string()
      .optional()
      .describe('Filters events by community id associated to quest'),
    from: z.coerce
      .date()
      .optional()
      .describe('Filters events after this date excluding'),
    to: z.coerce
      .date()
      .optional()
      .describe('Filters events before this date including'),
    event_name: z.string().optional().describe('Filters events by event name'),
  }),
  output: z.array(XpLogView),
};
