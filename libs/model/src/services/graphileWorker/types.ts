import { CronItem, JobHelpers, PromiseOrDirect } from 'graphile-worker';
import { z, ZodObject, ZodSchema, ZodUndefined } from 'zod';

export enum GraphileTaskNames {
  ArchiveOutbox = 'ArchiveOutbox',
  UpdateSitemap = 'UpdateSitemap',
  CleanSubscriptions = 'CleanSubscriptions',
  CleanChainEventXpSources = 'CleanChainEventXpSources',
  RunDbMaintenance = 'RunDbMaintenance',
  AwardTwitterQuestXp = 'AwardTwitterQuestXp',
}

export type GraphileTask<
  Input extends ZodSchema | ZodObject<{}> = ZodObject<{}>,
> = {
  readonly input: Input;
  readonly fn: (
    payload: z.infer<Input>,
    helpers: JobHelpers,
  ) => PromiseOrDirect<void | unknown[]>;
};

export type CustomCronItem = CronItem & {
  task: GraphileTaskNames;
};

export const TaskPayloads = {
  ArchiveOutbox: z.object({}),
  UpdateSitemap: z.object({}),
  CleanSubscriptions: z.object({}),
  CleanChainEventXpSources: z.object({}),
  RunDbMaintenance: z.object({}),
  AwardTwitterQuestXp: z.object({
    quest_id: z.number(),
    quest_end_date: z.coerce.date(),
  }),
} as const satisfies Record<GraphileTaskNames, ZodSchema | ZodUndefined>;
