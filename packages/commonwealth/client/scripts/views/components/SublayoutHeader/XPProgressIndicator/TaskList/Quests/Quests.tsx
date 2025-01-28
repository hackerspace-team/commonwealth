import clsx from 'clsx';
import React from 'react';

import { useCommonNavigate } from 'navigation/helpers';
import { CWText } from 'views/components/component_kit/cw_text';
import { CWButton } from 'views/components/component_kit/new_designs/CWButton';
import QuestTask from './QuestTask';
import './Quests.scss';

type QuestsProps = {
  className?: string;
  quests: {
    id: number;
    imageURL: string;
    xpPoints: number;
    title: string;
    daysLeftBeforeEnd: number;
  }[];
};

const Quests = ({ className, quests }: QuestsProps) => {
  const navigate = useCommonNavigate();

  const handleSeeAllQuests = () => {
    navigate('/explore');
  };

  const handleQuestCTAClick = () => {
    // TODO: navigate to quest details in #10732
  };

  return (
    <div className={clsx('Quests', className)}>
      <div className="header">
        <CWText type="b1" fontWeight="semiBold">
          Weekly Quests
        </CWText>
        <CWButton
          label="See all"
          iconRight="arrowRight"
          buttonHeight="sm"
          buttonWidth="narrow"
          buttonType="tertiary"
          onClick={handleSeeAllQuests}
        />
      </div>
      <div className="list">
        {quests.map((quest) => (
          <QuestTask
            key={quest.id}
            quest={quest}
            onClick={handleQuestCTAClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Quests;
