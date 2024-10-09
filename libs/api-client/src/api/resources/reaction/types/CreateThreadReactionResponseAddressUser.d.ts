/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../index';

export interface CreateThreadReactionResponseAddressUser {
  id?: number;
  email?: string;
  isAdmin?: boolean;
  disableRichText?: boolean;
  emailVerified?: boolean;
  selectedCommunityId?: string;
  emailNotificationInterval?: CommonApi.CreateThreadReactionResponseAddressUserEmailNotificationInterval;
  promotionalEmailsEnabled?: boolean;
  isWelcomeOnboardFlowComplete?: boolean;
  profile: CommonApi.CreateThreadReactionResponseAddressUserProfile;
  xpPoints?: number;
  profileTags?: CommonApi.CreateThreadReactionResponseAddressUserProfileTagsItem[];
  apiKey?: CommonApi.CreateThreadReactionResponseAddressUserApiKey;
  createdAt?: Date;
  updatedAt?: Date;
}
