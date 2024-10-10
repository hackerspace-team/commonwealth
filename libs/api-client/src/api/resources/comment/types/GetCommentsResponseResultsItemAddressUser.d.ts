/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../index';
export interface GetCommentsResponseResultsItemAddressUser {
  id?: number;
  email?: string;
  isAdmin?: boolean;
  disableRichText?: boolean;
  emailVerified?: boolean;
  selectedCommunityId?: string;
  emailNotificationInterval?: CommonApi.GetCommentsResponseResultsItemAddressUserEmailNotificationInterval;
  promotionalEmailsEnabled?: boolean;
  isWelcomeOnboardFlowComplete?: boolean;
  profile: CommonApi.GetCommentsResponseResultsItemAddressUserProfile;
  xpPoints?: number;
  profileTags?: CommonApi.GetCommentsResponseResultsItemAddressUserProfileTagsItem[];
  apiKey?: CommonApi.GetCommentsResponseResultsItemAddressUserApiKey;
  createdAt?: Date;
  updatedAt?: Date;
}
