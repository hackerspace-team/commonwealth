import { trpc } from '@hicommonwealth/adapters';
import { CacheNamespaces, cache } from '@hicommonwealth/core';
import { Reaction, Thread } from '@hicommonwealth/model';
import { MixpanelCommunityInteractionEvent } from '../../shared/analytics/types';
import { applyCanvasSignedData } from '../federation';

export const trpcRouter = trpc.router({
  createThread: trpc.command(Thread.CreateThread, trpc.Tag.Thread, [
    trpc.fireAndForget(async (input, _, ctx) => {
      await applyCanvasSignedData(ctx.req.path, input.canvas_signed_data);
    }),
    trpc.trackAnalytics([
      MixpanelCommunityInteractionEvent.CREATE_THREAD,
      ({ community_id }) => ({ community: community_id }),
    ]),
  ]),
  updateThread: trpc.command(Thread.UpdateThread, trpc.Tag.Thread, [
    trpc.fireAndForget(async (input, _, ctx) => {
      await applyCanvasSignedData(ctx.req.path, input.canvas_signed_data);
    }),
    trpc.trackAnalytics((input) =>
      Promise.resolve(
        input.stage !== undefined
          ? [MixpanelCommunityInteractionEvent.UPDATE_STAGE, {}]
          : undefined,
      ),
    ),
  ]),
  createThreadReaction: trpc.command(
    Thread.CreateThreadReaction,
    trpc.Tag.Reaction,
    [
      trpc.fireAndForget(async (input, _, ctx) => {
        await applyCanvasSignedData(ctx.req.path, input.canvas_signed_data);
      }),
      trpc.trackAnalytics([
        MixpanelCommunityInteractionEvent.CREATE_REACTION,
        ({ community_id }) => ({ community: community_id }),
      ]),
    ],
  ),
  deleteThread: trpc.command(Thread.DeleteThread, trpc.Tag.Thread, [
    trpc.fireAndForget(async (input, _, ctx) => {
      await applyCanvasSignedData(ctx.req.path, input.canvas_signed_data);
    }),
    trpc.fireAndForget(async () => {
      await cache().deleteKey(
        CacheNamespaces.Query_Response,
        'GetGlobalActivity_{}', // this is the global activity cache key
      );
    }),
  ]),
  deleteReaction: trpc.command(Reaction.DeleteReaction, trpc.Tag.Reaction, [
    trpc.fireAndForget(async (input, _, ctx) => {
      await applyCanvasSignedData(ctx.req.path, input.canvas_signed_data);
    }),
  ]),
  getThreads: trpc.query(Thread.GetThreads, trpc.Tag.Thread),
  getThreadsByIds: trpc.query(Thread.GetThreadsByIds, trpc.Tag.Thread),
});
