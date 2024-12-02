import React from 'react';

import './Profile.scss';

import Thread from 'models/Thread';
import { CWText } from '../component_kit/cw_text';
import type { CommentWithAssociatedThread } from './ProfileActivity';
import ProfileActivityRow from './ProfileActivityRow';
import { ProfileThread } from './ProfileThread';

enum ProfileActivityType {
  Addresses,
  Comments,
  Communities,
  Threads,
}

type ProfileActivityContentProps = {
  option: ProfileActivityType;
  threads: Thread[];
  comments: CommentWithAssociatedThread[];
  mapProfileThread: (thread: Thread) => Thread;
};

const ProfileActivityContent = ({
  option,
  comments,
  threads,
  mapProfileThread,
}: ProfileActivityContentProps) => {
  if (option === ProfileActivityType.Threads) {
    if (threads.length === 0) {
      return (
        <div className="empty-state">
          <CWText className="empty-state-text">
            You currently have no threads.
          </CWText>
          <CWText className="empty-state-text">
            Create a thread to see them here.
          </CWText>
        </div>
      );
    }
    return (
      <>
        {threads
          .sort((a, b) => +b.createdAt - +a.createdAt)
          .map((thread, i) => (
            <ProfileThread
              thread={mapProfileThread(thread) as Thread}
              key={i}
            />
          ))}
      </>
    );
  }

  const allActivities: Array<CommentWithAssociatedThread | Thread> = [
    ...comments,
    ...threads,
  ].sort((a, b) => +b.createdAt - +a.createdAt);

  if (allActivities.length === 0) {
    return (
      <div className="empty-state">
        <CWText className="empty-state-text">
          You currently have no activity.
        </CWText>
        <CWText className="empty-state-text">
          Join or create a community to have activity.
        </CWText>
      </div>
    );
  }

  return (
    <>
      {allActivities.map((activity, i) => {
        return <ProfileActivityRow key={i} activity={activity} />;
      })}
    </>
  );
};

export default ProfileActivityContent;
