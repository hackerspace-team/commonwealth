/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as core from '../../../../core';
import { GetGlobalActivityResponseItemRecentCommentsItem } from './GetGlobalActivityResponseItemRecentCommentsItem';
import { GetGlobalActivityResponseItemThread } from './GetGlobalActivityResponseItemThread';
export const GetGlobalActivityResponseItem = core.serialization.object({
  thread: GetGlobalActivityResponseItemThread,
  recentComments: core.serialization.property(
    'recent_comments',
    core.serialization
      .list(GetGlobalActivityResponseItemRecentCommentsItem)
      .optional(),
  ),
});
