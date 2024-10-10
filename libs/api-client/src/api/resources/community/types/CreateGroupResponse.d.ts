/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../index';
export interface CreateGroupResponse {
  id?: string;
  name?: string;
  chainNodeId?: number;
  defaultSymbol?: string;
  network?: string;
  base?: CommonApi.CreateGroupResponseBase;
  iconUrl?: string;
  active?: boolean;
  type?: CommonApi.CreateGroupResponseType;
  description?: string;
  socialLinks?: CommonApi.CreateGroupResponseSocialLinksItem[];
  ss58Prefix?: number;
  stagesEnabled?: boolean;
  customStages?: string[];
  customDomain?: string;
  blockExplorerIds?: string;
  collapsedOnHomepage?: boolean;
  defaultSummaryView?: boolean;
  defaultPage?: CommonApi.CreateGroupResponseDefaultPage;
  hasHomepage?: CommonApi.CreateGroupResponseHasHomepage;
  terms?: CommonApi.CreateGroupResponseTerms;
  adminOnlyPolling?: boolean;
  bech32Prefix?: string;
  hideProjects?: boolean;
  tokenName?: string;
  ceVerbose?: boolean;
  discordConfigId?: number;
  category?: unknown;
  discordBotWebhooksEnabled?: boolean;
  directoryPageEnabled?: boolean;
  directoryPageChainNodeId?: number;
  namespace?: string;
  namespaceAddress?: string;
  redirect?: string;
  snapshotSpaces?: string[];
  includeInDigestEmail?: boolean;
  profileCount?: number;
  lifetimeThreadCount?: number;
  bannerText?: string;
  createdAt?: Date;
  updatedAt?: Date;
  addresses?: CommonApi.CreateGroupResponseAddressesItem[];
  communityStakes?: CommonApi.CreateGroupResponseCommunityStakesItem[];
  communityTags?: CommonApi.CreateGroupResponseCommunityTagsItem[];
  chainNode?: CommonApi.CreateGroupResponseChainNode;
  topics?: CommonApi.CreateGroupResponseTopicsItem[];
  groups?: CommonApi.CreateGroupResponseGroupsItem[];
  contestManagers?: CommonApi.CreateGroupResponseContestManagersItem[];
}
