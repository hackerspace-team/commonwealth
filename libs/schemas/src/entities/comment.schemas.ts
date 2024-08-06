import { z } from 'zod';
import { PG_INT, zDate } from '../utils';
import { Address } from './user.schemas';

export const Comment = z.object({
  thread_id: PG_INT,
  address_id: PG_INT,
  text: z.string(),
  plaintext: z.string(),
  id: PG_INT.nullish(),
  community_id: z.string(),
  parent_id: z.string().nullish(),

  canvas_signed_data: z.string(),
  canvas_hash: z.string(),

  created_by: z.string().nullish(),
  created_at: zDate.nullish(),
  updated_at: zDate.nullish(),
  deleted_at: zDate.nullish(),
  marked_as_spam_at: zDate.nullish(),

  discord_meta: z
    .object({
      user: z.object({
        id: z.string(),
        username: z.string(),
      }),
      channel_id: z.string(),
      message_id: z.string(),
    })
    .nullish(),

  reaction_count: PG_INT,
  reaction_weights_sum: PG_INT.optional(),

  Address: Address.nullish(),
});

export const CommentVersionHistory = z.object({
  id: PG_INT.optional(),
  comment_id: PG_INT,
  text: z.string(),
  timestamp: z.date(),
});
