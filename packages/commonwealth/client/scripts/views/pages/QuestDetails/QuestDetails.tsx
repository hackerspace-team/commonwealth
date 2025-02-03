import { EventNames, QuestParticipationLimit } from '@hicommonwealth/schemas';
import { questParticipationPeriodToCopyMap } from 'helpers/quest';
import { useFlag } from 'hooks/useFlag';
import moment from 'moment';
import { useCommonNavigate } from 'navigation/helpers';
import React from 'react';
import { useGetQuestByIdQuery } from 'state/api/quest';
import { useGetRandomResourceIds, useGetXPs } from 'state/api/user';
import { useAuthModalStore } from 'state/ui/modals';
import useUserStore from 'state/ui/user';
import { CWDivider } from 'views/components/component_kit/cw_divider';
import { CWText } from 'views/components/component_kit/cw_text';
import { CWButton } from 'views/components/component_kit/new_designs/CWButton';
import CWCircleMultiplySpinner from 'views/components/component_kit/new_designs/CWCircleMultiplySpinner';
import CWPageLayout from 'views/components/component_kit/new_designs/CWPageLayout';
import { CWTag } from 'views/components/component_kit/new_designs/CWTag';
import { withTooltip } from 'views/components/component_kit/new_designs/CWTooltip';
import { AuthModalType } from 'views/modals/AuthModal';
import { PageNotFound } from '../404';
import { QuestAction } from '../CreateQuest/CreateQuestForm/QuestActionSubForm';
import { doesActionRequireCreatorReward } from '../CreateQuest/CreateQuestForm/QuestActionSubForm/helpers';
import './QuestDetails.scss';

const actionCopies = {
  title: {
    [EventNames.SignUpFlowCompleted]: 'Signup on Common',
    [EventNames.CommunityCreated]: 'Create a community',
    [EventNames.CommunityJoined]: 'Join a community',
    [EventNames.ThreadCreated]: 'Create a thread',
    [EventNames.ThreadUpvoted]: 'Upvote a thread',
    [EventNames.CommentCreated]: 'Create a comment',
    [EventNames.CommentUpvoted]: 'Upvote a comment',
    [EventNames.UserMentioned]: 'Mention a user',
  },
  shares: {
    [EventNames.SignUpFlowCompleted]: '',
    [EventNames.CommunityCreated]: 'referrer',
    [EventNames.CommunityJoined]: 'referrer',
    [EventNames.ThreadCreated]: '',
    [EventNames.ThreadUpvoted]: '',
    [EventNames.CommentCreated]: '',
    [EventNames.CommentUpvoted]: 'comment owner',
    [EventNames.UserMentioned]: '',
  },
};

const QuestDetails = ({ id }: { id: number }) => {
  const questId = parseInt(`${id}`) || 0;
  const navigate = useCommonNavigate();
  const user = useUserStore();
  const xpEnabled = useFlag('xp');

  const { data: quest, isLoading } = useGetQuestByIdQuery({
    quest_id: questId,
    enabled: !!(xpEnabled && questId),
  });

  const { data: xpProgressions = [] } = useGetXPs({
    user_id: user.id,
    quest_id: questId,
    enabled: user.isLoggedIn && xpEnabled,
  });

  const { data: randomResourceIds, isLoading: isLoadingRandomResourceIds } =
    useGetRandomResourceIds({
      limit: 1,
      cursor: 1,
      enabled: true,
    });
  const randomResourceId = randomResourceIds?.results?.[0];

  const { setAuthModalType } = useAuthModalStore();

  if (!xpEnabled || !questId) {
    return <PageNotFound />;
  }

  if (isLoading || isLoadingRandomResourceIds) {
    return <CWCircleMultiplySpinner />;
  }

  if (!quest) {
    return <PageNotFound />;
  }

  const gainedXP =
    xpProgressions
      .filter((p) => p.quest_id === quest.id)
      .map((p) => p.xp_points)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0) ||
    0;

  const totalXP =
    (quest.action_metas || [])
      ?.map((action) => action.reward_amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0) ||
    0;

  const isCompleted = gainedXP === totalXP;

  const handleActionStart = (actionName: QuestAction) => {
    switch (actionName) {
      case EventNames.SignUpFlowCompleted: {
        !user?.isLoggedIn && setAuthModalType(AuthModalType.CreateAccount);
        break;
      }
      case EventNames.CommunityCreated: {
        navigate(`/createCommunity`, {}, null);
        break;
      }
      case EventNames.ThreadCreated: {
        navigate(`/${randomResourceId?.community_id}/new/discussion`, {}, null);
        break;
      }
      case EventNames.CommunityJoined: {
        navigate(`/${randomResourceId?.community_id}/discussions`, {}, null);
        break;
      }
      case EventNames.ThreadUpvoted:
      case EventNames.CommentCreated: {
        navigate(`/discussion/${`${randomResourceId?.thread_id}`}`, {}, null);
        break;
      }
      case EventNames.CommentUpvoted: {
        navigate(
          `/discussion/${
            randomResourceId?.thread_id
          }?comment=${randomResourceId?.comment_id}`,
          {},
          null,
        );
        break;
      }
      case EventNames.UserMentioned: {
        // TODO: user mention is not implemented in app
        break;
      }
      default:
        return;
    }
  };
  const isStarted = moment().isSameOrAfter(moment(quest.start_date));
  const isEnded = moment().isSameOrAfter(moment(quest.end_date));

  const isRepeatableQuest =
    quest.action_metas?.[0]?.participation_limit ===
    QuestParticipationLimit.OncePerPeriod;
  const questRepeatitionCycle = quest.action_metas?.[0]?.participation_period;
  const questParticipationLimitPerCycle =
    quest.action_metas?.[0]?.participation_times_per_period || 0;

  return (
    <CWPageLayout>
      <section className="QuestDetails">
        <CWText type="h2" className="header">
          Quest Details
        </CWText>
        <CWDivider />
        <div className="content">
          <div className="header">
            <CWText type="h4">{quest.name}</CWText>
            <CWText type="b1">{quest.description}</CWText>
            <CWTag
              type="active"
              label={`From ${moment(quest.start_date).format(
                'DD/MM/YYYY',
              )} to ${moment(quest.end_date).format('DD/MM/YYYY')}`}
            />
            {isRepeatableQuest && (
              <CWTag
                type="active"
                label={`Users can participate ${
                  questParticipationLimitPerCycle
                } times every ${questParticipationPeriodToCopyMap[questRepeatitionCycle || '']}}`}
              />
            )}
            {isCompleted && <CWTag type="active" label="Completed" />}
          </div>
          <CWDivider />
          <div className="grid">
            <img
              className="featured-img"
              src={quest.image_url}
              alt="featured-image"
            />
            <div className="quest-actions">
              <div className="header">
                <CWText type="b1" fontWeight="semiBold" fontStyle="uppercase">
                  Actions to take!
                </CWText>
                <CWTag
                  label={`${gainedXP > 0 ? `${gainedXP} / ` : ''}${totalXP} XP`}
                  type="proposal"
                />
              </div>
              <CWDivider />
              <div className="list">
                {(quest.action_metas || [])?.map((action, index) => (
                  <div className="action-details" key={action.id}>
                    <div className="counter">
                      <CWText type="b1" fontWeight="semiBold">
                        #{index + 1}
                      </CWText>
                    </div>
                    <div className="content">
                      <div className="left">
                        <CWText type="b1" fontWeight="semiBold">
                          {actionCopies.title[action.event_name]}
                        </CWText>
                        {doesActionRequireCreatorReward(action.event_name) && (
                          <CWText type="caption" className="xp-shares">
                            <span className="creator-share">
                              {action.creator_reward_weight}%
                            </span>
                            &nbsp; shared with{' '}
                            {actionCopies.shares[action.event_name]}
                          </CWText>
                        )}
                        <div className="points">
                          <CWTag
                            label={`${action.reward_amount} XP`}
                            type="proposal"
                          />
                          {/* TODO: helper link here */}
                        </div>
                      </div>
                      {user?.isLoggedIn &&
                      action.event_name === 'SignUpFlowCompleted' ? (
                        <CWTag label="Not eligible" type="address" />
                      ) : xpProgressions.find(
                          (p) => p.action_meta_id === action.id,
                        ) ? (
                        <CWTag label="Completed" type="address" />
                      ) : (
                        withTooltip(
                          <CWButton
                            buttonType="secondary"
                            buttonAlt="green"
                            label="Start"
                            buttonHeight="sm"
                            buttonWidth="narrow"
                            iconRight="arrowRightPhosphor"
                            onClick={() => handleActionStart(action.event_name)}
                            disabled={!isStarted || isEnded}
                          />,
                          !isStarted
                            ? 'Only available when quest starts'
                            : 'Unavailable, quest has ended',
                          !isStarted || isEnded,
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </CWPageLayout>
  );
};

export default QuestDetails;
