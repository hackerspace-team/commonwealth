import {
  ChannelBatchActions,
  QuestActionNames,
  QuestParticipationLimit,
  QuestParticipationPeriod,
} from '@hicommonwealth/schemas';

export type QuestAction =
  | (typeof QuestActionNames)[number]
  | (typeof ChannelBatchActions)[number];
export enum QuestActionContentIdScope {
  Topic = 'topic',
  Thread = 'thread',
  TwitterTweet = 'twitter_tweet',
}

export type QuestActionSubFormErrors = {
  action?: string;
  instructionsLink?: string;
  rewardAmount?: string;
  creatorRewardAmount?: string;
  participationLimit?: string;
  // specific for certain quest action types
  contentIdScope?: string;
  contentLink?: string;
  // specific to twitter actions
  noOfLikes?: string;
  noOfRetweets?: string;
  noOfReplies?: string;
};

export type QuestActionSubFormFields = {
  action?: QuestAction;
  instructionsLink?: string;
  rewardAmount?: string | number;
  creatorRewardAmount?: string | number;
  participationLimit?: QuestParticipationLimit;
  participationPeriod?: QuestParticipationPeriod;
  participationTimesPerPeriod?: string | number;
  // specific for certain quest action types
  contentIdScope?: QuestActionContentIdScope;
  contentLink?: string;
  // specific to twitter actions
  noOfLikes?: string | number;
  noOfRetweets?: string | number;
  noOfReplies?: string | number;
};

export type QuestActionSubFormConfig = {
  requires_creator_points: boolean;
  with_optional_topic_id: boolean;
  with_optional_thread_id: boolean;
  with_optional_comment_id: boolean;
  with_required_twitter_tweet_link: boolean;
};

export type QuestActionSubFormInternalRefs = {
  runParticipationLimitValidator: () => void;
};

export type QuestActionSubFormProps = {
  errors?: QuestActionSubFormErrors;
  defaultValues?: QuestActionSubFormFields;
  onChange?: (params: QuestActionSubFormFields) => void;
  config?: QuestActionSubFormConfig;
  isRemoveable?: boolean;
  onRemove?: () => void;
  hiddenActions?: QuestAction[];
  internalRefs?: QuestActionSubFormInternalRefs;
};

export type QuestActionSubFormState = {
  id: number;
  values: QuestActionSubFormFields;
  errors?: QuestActionSubFormErrors;
  config?: QuestActionSubFormConfig;
  refs?: QuestActionSubFormInternalRefs;
};

export type useQuestActionMultiFormsStateProps = {
  minSubForms: number;
  maxSubForms: number;
  validateAfterUpdate?: boolean;
};
