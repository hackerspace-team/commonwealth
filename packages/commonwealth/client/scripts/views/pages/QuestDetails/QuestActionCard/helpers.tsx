import React from 'react';

export const actionCopies = {
  title: {
    ['CommunityCreated']: 'Create a community',
    ['CommunityJoined']: 'Join a community',
    ['ThreadCreated']: 'Create a thread',
    ['ThreadUpvoted']: 'Upvote a thread',
    ['CommentCreated']: 'Create a comment',
    ['CommentUpvoted']: 'Upvote a comment',
    ['WalletLinked']: 'Link a new wallet',
    ['SSOLinked']: 'Link a new social (SSO)',
    ['TweetEngagement']: 'Engage on Tweet',
  },
  pre_reqs: {
    ['CommunityCreated']: () => '',
    ['CommunityJoined']: () => '',
    ['ThreadCreated']: () => '',
    ['ThreadUpvoted']: () => '',
    ['CommentCreated']: () => '',
    ['CommentUpvoted']: () => '',
    ['WalletLinked']: () => '',
    ['SSOLinked']: () => '',
    ['TweetEngagement']: (displayFor: 'user' | 'admin' = 'user') =>
      `Requires Twitter/X linked to ${displayFor === 'admin' ? 'user' : 'your'} profile.`,
  },
  explainer: {
    ['CommunityCreated']: () => '',
    ['CommunityJoined']: () => '',
    ['ThreadCreated']: () => '',
    ['ThreadUpvoted']: () => '',
    ['CommentCreated']: () => '',
    ['CommentUpvoted']: () => '',
    ['WalletLinked']: () => '',
    ['SSOLinked']: () => '',
    ['TweetEngagement']: (likes: number, retweets: number, replies: number) => (
      <>
        XP rewarded to participants after any of these tweet metrics are met.
        <br />
        {/* TODO: 11391 update this to only show counts > 0 */}
        {likes} Likes, {retweets} Retweets or {replies} Replies.
      </>
    ),
  },
  shares: {
    ['CommunityCreated']: 'referrer',
    ['CommunityJoined']: 'referrer',
    ['ThreadCreated']: '',
    ['ThreadUpvoted']: '',
    ['CommentCreated']: '',
    ['CommentUpvoted']: 'comment creator',
    ['WalletLinked']: '',
    ['SSOLinked']: '',
    ['UserMentioned']: '',
    ['TweetEngagement']: '',
  },
};
