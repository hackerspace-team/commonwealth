import { getRandomAvatar } from '@hicommonwealth/shared';
import clsx from 'clsx';
import { calculateQuestTimelineLabel } from 'helpers/quest';
import React from 'react';
import { useGetCommunityByIdQuery } from 'state/api/communities';
import { Skeleton } from 'views/components/Skeleton';
import CommunityInfo from 'views/components/component_kit/CommunityInfo';
import { CWDivider } from 'views/components/component_kit/cw_divider';
import { CWIconButton } from 'views/components/component_kit/cw_icon_button';
import { CWText } from 'views/components/component_kit/cw_text';
import { CWButton } from 'views/components/component_kit/new_designs/CWButton';
import { CWTag } from 'views/components/component_kit/new_designs/CWTag';
import { withTooltip } from 'views/components/component_kit/new_designs/CWTooltip';
import './QuestCard.scss';

interface QuestCardProps {
  name: string;
  description: string;
  communityId?: string;
  iconURL: string;
  xpPoints: number;
  startDate: Date;
  endDate: Date;
  className?: string;
  onCTAClick?: () => void;
  onLeaderboardClick?: () => void;
  onCardBodyClick?: () => void;
}

const MAX_CHARS_FOR_LABELS = 14;
const MAX_CHARS_FOR_DESCRIPTIONS = 24;

const QuestCard = ({
  name,
  description,
  communityId,
  iconURL,
  xpPoints,
  startDate,
  endDate,
  className,
  onCardBodyClick,
  onLeaderboardClick,
  onCTAClick,
}: QuestCardProps) => {
  const handleBodyClick = (e: React.MouseEvent) =>
    e.target === e.currentTarget && onCardBodyClick?.();

  const isNameTrimmed = name.length > MAX_CHARS_FOR_LABELS;
  const trimmedName = isNameTrimmed
    ? name.slice(0, MAX_CHARS_FOR_LABELS) + '...'
    : name;
  const isDescriptionTrimmed = description.length > MAX_CHARS_FOR_DESCRIPTIONS;
  const trimmedDescription = isDescriptionTrimmed
    ? description.slice(0, MAX_CHARS_FOR_DESCRIPTIONS) + '...'
    : description;

  const { data: community, isLoading: isLoadingCommunity } =
    useGetCommunityByIdQuery({
      id: communityId || '',
      enabled: !!communityId,
    });

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx('QuestCard', className)}
      onClick={handleBodyClick}
    >
      <div className="quest-scope">
        {communityId ? (
          <>
            {isLoadingCommunity || !community ? (
              <Skeleton />
            ) : (
              <CommunityInfo
                name={community.name}
                communityId={community.id}
                iconUrl={community.icon_url || ''}
              />
            )}
          </>
        ) : (
          <CommunityInfo
            name="Global Quest"
            communityId="global"
            iconUrl={getRandomAvatar()}
            linkToCommunity={false}
          />
        )}
        <CWIconButton iconName="gearPhosphor" onClick={() => onCTAClick?.()} />
      </div>
      <CWDivider />
      <img src={iconURL} className="image" onClick={handleBodyClick} />
      <div className="content">
        <div className="basic-info" onClick={handleBodyClick}>
          {withTooltip(
            <CWText className="text-dark" type="h4" fontWeight="regular">
              {trimmedName}
            </CWText>,
            name,
            isNameTrimmed,
          )}
          {withTooltip(
            <CWText className="text-light">{trimmedDescription}</CWText>,
            description,
            isDescriptionTrimmed,
          )}
        </div>
        <CWDivider />
        {/* time label */}
        <CWText className="time-label" type="b1" fontWeight="semiBold">
          {calculateQuestTimelineLabel({ startDate, endDate })}
        </CWText>
        {/* ends on row */}
        <div className="xp-row">
          <CWTag type="proposal" label={`${xpPoints} XP`} />
          <CWButton
            iconLeft="upvote"
            label="Leaderboard"
            onClick={onLeaderboardClick}
            containerClassName="leaderboard-btn"
            buttonWidth="narrow"
            buttonType="secondary"
            buttonHeight="sm"
          />
        </div>
        {/* action cta */}
        <CWButton
          label="See Details"
          containerClassName="action-btn"
          buttonWidth="full"
          buttonType="secondary"
          buttonAlt="green"
          onClick={() => onCTAClick?.()}
        />
      </div>
    </div>
  );
};

export default QuestCard;
