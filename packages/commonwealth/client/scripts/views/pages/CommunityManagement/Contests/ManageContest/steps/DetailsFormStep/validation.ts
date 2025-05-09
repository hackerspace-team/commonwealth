import { TopicWeightedVoting } from '@hicommonwealth/schemas';
import { VALIDATION_MESSAGES } from 'helpers/formValidations/messages';
import { ContestFeeType } from 'views/pages/CommunityManagement/Contests/ManageContest/types';
import z from 'zod';

export const detailsFormValidationSchema = (isFarcasterContest: boolean) => {
  return z.object({
    contestName: z
      .string()
      .min(1, { message: 'You must name your contest' })
      .max(255, { message: VALIDATION_MESSAGES.MAX_CHAR_LIMIT_REACHED }),
    contestDescription: z.string().optional(),
    contestImage: z.string().optional(),
    contestTopic: z
      .object({
        value: z.number().optional(),
        label: z.string(),
        helpText: z.string().optional(),
        weightedVoting: z.nativeEnum(TopicWeightedVoting).optional().nullish(),
        tokenAddress: z.string().optional().nullable(),
      })
      .optional()
      .refine(
        (value) => {
          if (isFarcasterContest) {
            return true;
          }

          return !!value;
        },
        {
          message: 'You must select a topic',
        },
      ),
    feeType: z.enum([
      ContestFeeType.CommunityStake,
      ContestFeeType.DirectDeposit,
    ]),
    contestRecurring: z.string(),
    fundingTokenAddress: z
      .string()
      .optional()
      .nullable()
      .refine(
        (value) => {
          if (isFarcasterContest && !value) {
            return false;
          }
          return true;
        },
        {
          message: 'Must specify funding token address for Farcaster contests',
        },
      ),
    isFarcasterContest: z.boolean().default(false),
    voteWeightMultiplier: z.coerce.number().optional().nullish(),
  });
};
