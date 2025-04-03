import { QuestParticipationPeriod } from '@hicommonwealth/schemas';
import { z } from 'zod';
import { QuestActionSubFormFields } from './QuestActionSubForm';
import { questFormValidationSchema } from './validation';

export enum QuestTypes {
  Channel = 'channel',
  Common = 'common',
}

export type QuestFormProps =
  | {
      mode: 'create';
      questId?: never;
      initialValues?: never;
    }
  | {
      mode: 'update';
      questId: number;
      initialValues: z.infer<typeof questFormValidationSchema> & {
        participation_period?: QuestParticipationPeriod;
        participation_times_per_period?: number;
      } & {
        subForms: QuestActionSubFormFields[];
      };
    };
