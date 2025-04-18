import {
  CanvasSignedData,
  deserializeCanvas,
  verify,
} from '@hicommonwealth/shared';
import { CWIcon } from 'client/scripts/views/components/component_kit/cw_icons/cw_icon';
import { CWText } from 'client/scripts/views/components/component_kit/cw_text';
import { CWButton } from 'client/scripts/views/components/component_kit/new_designs/CWButton';
import { CWTooltip } from 'client/scripts/views/components/component_kit/new_designs/CWTooltip';
import { pluralize } from 'helpers';
import { GetThreadActionTooltipTextResponse } from 'helpers/threads';
import Thread from 'models/Thread';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useUserStore from 'state/ui/user';
import Permissions from 'utils/Permissions';
import { downloadDataAsFile } from 'utils/downloadDataAsFile';
import ShareButton from 'views/components/ShareButton';
import { ViewUpvotesDrawerTrigger } from 'views/components/UpvoteDrawer';
import { CWThreadAction } from 'views/components/component_kit/new_designs/cw_thread_action';
import { ToggleThreadSubscribe } from 'views/pages/discussions/ThreadCard/ThreadOptions/ToggleThreadSubscribe';
import { AdminActions, AdminActionsProps } from './AdminActions';
import { ReactionButton } from './ReactionButton';
import './ThreadOptions.scss';

type OptionsProps = AdminActionsProps & {
  thread?: Thread;
  upvoteBtnVisible?: boolean;
  commentBtnVisible?: boolean;
  shareEndpoint?: string;
  canUpdateThread?: boolean;
  canReact?: boolean;
  canComment?: boolean;
  totalComments?: number;
  disabledActionsTooltipText?: GetThreadActionTooltipTextResponse;
  onCommentBtnClick?: () => any;
  upvoteDrawerBtnBelow?: boolean;
  hideUpvoteDrawerButton?: boolean;
  setIsUpvoteDrawerOpen?: Dispatch<SetStateAction<boolean>>;
  editingDisabled?: boolean;
  onCommentClick?: () => void;
  expandCommentBtnVisible?: boolean;
  showCommentVisible?: boolean;
  toggleShowComments?: () => void;
  showOnlyThreadActionIcons?: boolean;
};

export const ThreadOptions = ({
  thread,
  upvoteBtnVisible = false,
  commentBtnVisible = true,
  shareEndpoint,
  canUpdateThread,
  canReact = true,
  canComment = true,
  totalComments,
  onLockToggle,
  onCollaboratorsEdit,
  onDelete,
  onEditStart,
  onEditCancel,
  onEditConfirm,
  onPinToggle,
  onProposalStageChange,
  onSnapshotProposalFromThread,
  onSpamToggle,
  hasPendingEdits,
  disabledActionsTooltipText = '',
  onCommentBtnClick = () => null,
  upvoteDrawerBtnBelow,
  hideUpvoteDrawerButton = false,
  setIsUpvoteDrawerOpen,
  editingDisabled,
  onCommentClick,
  expandCommentBtnVisible,
  showCommentVisible,
  toggleShowComments,
  showOnlyThreadActionIcons = false,
}: OptionsProps) => {
  const isCommunityMember = Permissions.isCommunityMember(thread.communityId);
  const userStore = useUserStore();

  const handleDownloadMarkdown = () => {
    downloadDataAsFile(thread.body, 'text/markdown', thread.title + '.md');
  };

  const [verifiedCanvasSignedData, setVerifiedCanvasSignedData] =
    useState<CanvasSignedData | null>(null);
  useEffect(() => {
    try {
      const canvasSignedData: CanvasSignedData = deserializeCanvas(
        thread.canvasSignedData!,
      );
      if (!canvasSignedData) return;
      verify(canvasSignedData)
        .then(() => {
          setVerifiedCanvasSignedData(canvasSignedData);
        })
        .catch(() => null);
    } catch (error) {
      // ignore errors or missing data
    }
  }, [thread.canvasSignedData]);

  return (
    <>
      <div className="ThreadOptions">
        <div className="options-container">
          {!hideUpvoteDrawerButton && !upvoteDrawerBtnBelow && (
            <ViewUpvotesDrawerTrigger
              onClick={(e) => {
                e.preventDefault();
                // @ts-expect-error <StrictNullChecks/>
                setIsUpvoteDrawerOpen(true);
              }}
            />
          )}

          {upvoteBtnVisible && thread && (
            <ReactionButton
              thread={thread}
              size="small"
              disabled={!canReact}
              undoUpvoteDisabled={editingDisabled}
              tooltipText={
                typeof disabledActionsTooltipText === 'function'
                  ? disabledActionsTooltipText?.('upvote')
                  : disabledActionsTooltipText
              }
            />
          )}

          {/* @ts-expect-error StrictNullChecks*/}
          {commentBtnVisible && totalComments >= 0 && (
            <CWThreadAction
              label={
                showOnlyThreadActionIcons
                  ? ''
                  : // @ts-expect-error <StrictNullChecks/>
                    pluralize(totalComments, 'Comment')
              }
              action="comment"
              disabled={!canComment}
              onClick={(e) => {
                e.preventDefault();
                onCommentBtnClick();
                onCommentClick && onCommentClick();
              }}
              tooltipText={
                typeof disabledActionsTooltipText === 'function'
                  ? disabledActionsTooltipText?.('comment')
                  : disabledActionsTooltipText
              }
            />
          )}

          {shareEndpoint && (
            <ShareButton
              url={shareEndpoint}
              title={thread.title}
              text="See my thread and join me on Common"
              shareType="thread"
              buttonLabel={showOnlyThreadActionIcons ? '' : 'Share'}
            />
          )}

          {userStore.id > 0 && (
            <ToggleThreadSubscribe
              thread={thread}
              isCommunityMember={isCommunityMember}
              showLabel={!showOnlyThreadActionIcons}
            />
          )}

          {verifiedCanvasSignedData && (
            <CWText
              type="caption"
              fontWeight="medium"
              className="verification-icon"
            >
              <CWTooltip
                placement="top"
                content="Signed by author"
                renderTrigger={(handleInteraction) => (
                  <span
                    onMouseEnter={handleInteraction}
                    onMouseLeave={handleInteraction}
                  >
                    <CWIcon iconName="check" iconSize="xs" />
                  </span>
                )}
              ></CWTooltip>
            </CWText>
          )}

          {thread && (
            <AdminActions
              canUpdateThread={canUpdateThread}
              thread={thread}
              onLockToggle={onLockToggle}
              onCollaboratorsEdit={onCollaboratorsEdit}
              onDelete={onDelete}
              onEditStart={onEditStart}
              onEditCancel={onEditCancel}
              onEditConfirm={onEditConfirm}
              onPinToggle={onPinToggle}
              onProposalStageChange={onProposalStageChange}
              onSnapshotProposalFromThread={onSnapshotProposalFromThread}
              onSpamToggle={onSpamToggle}
              onDownloadMarkdown={handleDownloadMarkdown}
              hasPendingEdits={hasPendingEdits}
              editingDisabled={editingDisabled}
            />
          )}
        </div>
        {Boolean(thread?.numberOfComments) && expandCommentBtnVisible && (
          <CWButton
            className="latest-button"
            buttonType="tertiary"
            buttonHeight="sm"
            label={showCommentVisible ? 'Hide comments' : 'Show comments'}
            iconLeft={showCommentVisible ? 'chevronUp' : 'chevronDown'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleShowComments?.();
            }}
          />
        )}
        {!hideUpvoteDrawerButton && upvoteDrawerBtnBelow && (
          <ViewUpvotesDrawerTrigger
            onClick={(e) => {
              e.preventDefault();
              // @ts-expect-error <StrictNullChecks/>
              setIsUpvoteDrawerOpen(true);
            }}
          />
        )}
      </div>
      {thread && <></>}
    </>
  );
};
