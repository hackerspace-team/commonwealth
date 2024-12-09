import React from 'react';

import { ContestView } from 'models/Thread';

import ThreadContestTag from './ThreadContestTag';
import { getWinnersFromAssociatedContests } from './utils';

interface ThreadContestTagContainerProps {
  associatedContests?: ContestView[];
}

const ThreadContestTagContainer = ({
  associatedContests,
}: ThreadContestTagContainerProps) => {
  console.log('--------------------------------');
  console.log('associatedContests', associatedContests);
  const contestWinners = getWinnersFromAssociatedContests(associatedContests);

  console.log('contestWinners', contestWinners);
  console.log('--------------------------------');
  const showContestWinnerTag = contestWinners.length > 0;

  return (
    <>
      {showContestWinnerTag &&
        contestWinners.map((winner, index) => {
          if (!winner || winner?.prize === 0) {
            return null;
          }

          return (
            <ThreadContestTag
              date={winner.date}
              round={winner.round}
              title={winner.title ?? ''}
              prize={winner.prize}
              key={index}
            />
          );
        })}
    </>
  );
};

export default ThreadContestTagContainer;
