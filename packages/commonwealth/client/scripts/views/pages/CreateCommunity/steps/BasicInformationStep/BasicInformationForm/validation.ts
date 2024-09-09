import { COMMUNITY_NAME_REGEX } from '@hicommonwealth/shared';
import { VALIDATION_MESSAGES } from 'helpers/formValidations/messages';
import z from 'zod';

export const basicInformationFormValidationSchema = z.object({
  communityName: z
    .string({ invalid_type_error: VALIDATION_MESSAGES.NO_INPUT })
    .nonempty({ message: VALIDATION_MESSAGES.NO_INPUT })
    .max(255, { message: VALIDATION_MESSAGES.MAX_CHAR_LIMIT_REACHED })
    .regex(COMMUNITY_NAME_REGEX, {
      message: `Invalid name, only a-z, A-Z, 0-9, !, @, #, &, (, ), :, _, $, /, \\, |, . and single spaces are allowed`,
    }),
  communityDescription: z
    .string({ invalid_type_error: VALIDATION_MESSAGES.NO_INPUT })
    .nonempty({ message: VALIDATION_MESSAGES.NO_INPUT })
    .max(250, { message: VALIDATION_MESSAGES.MAX_CHAR_LIMIT_REACHED }),
  communityProfileImageURL: z
    .string({ invalid_type_error: VALIDATION_MESSAGES.NO_INPUT })
    .nonempty({ message: VALIDATION_MESSAGES.NO_INPUT }),
  chain: z.object(
    {
      value: z.any().default(-1).optional(),
      label: z.string().default('').optional(),
    },
    {
      invalid_type_error: VALIDATION_MESSAGES.NO_INPUT,
      required_error: VALIDATION_MESSAGES.NO_INPUT,
    },
  ),
});
