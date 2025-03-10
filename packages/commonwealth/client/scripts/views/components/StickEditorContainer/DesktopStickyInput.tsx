import React, { useCallback, useState } from 'react';
import { useGenerateCommentText } from 'state/api/comments/generateCommentText';
import { useLocalAISettingsStore } from 'state/ui/user';
import { CommentEditor } from 'views/components/Comments/CommentEditor';
import type { CommentEditorProps } from 'views/components/Comments/CommentEditor/CommentEditor';
import { NewThreadForm } from 'views/components/NewThreadFormLegacy/NewThreadForm';
import { jumpHighlightComment } from 'views/pages/discussions/CommentTree/helpers';
import './DesktopStickyInput.scss';
import { useStickComment } from './context/StickCommentProvider';

export const DesktopStickyInput = (props: CommentEditorProps) => {
  const { isReplying, replyingToAuthor, onCancel, handleSubmitComment } = props;
  const { mode, isExpanded, setIsExpanded } = useStickComment();
  const { aiCommentsToggleEnabled, setAICommentsToggleEnabled } =
    useLocalAISettingsStore();
  const [streamingReplyIds, setStreamingReplyIds] = useState<number[]>([]);
  const { generateComment } = useGenerateCommentText();

  const handleFocused = useCallback(() => {
    setIsExpanded(true);
  }, [setIsExpanded]);

  const handleCancel = useCallback(
    (event: React.MouseEvent) => {
      console.log('DesktopStickyInput: handleCancel triggered');
      setIsExpanded(false);
      onCancel?.(event);
    },
    [onCancel, setIsExpanded],
  );

  const handleAiReply = useCallback(
    (commentId: number) => {
      if (streamingReplyIds.includes(commentId)) {
        return;
      }
      setStreamingReplyIds((prev) => [...prev, commentId]);
    },
    [streamingReplyIds],
  );

  const handleAiGenerate = useCallback(
    async (text: string) => {
      try {
        const generatedText = await generateComment(text, (update) => {
          console.log('AI generation update:', update);
        });
        return generatedText;
      } catch (error) {
        console.error('Failed to generate AI text:', error);
        return '';
      }
    },
    [generateComment],
  );

  const handleEnhancedSubmit = useCallback(async (): Promise<number> => {
    setIsExpanded(false);

    const commentId = await handleSubmitComment();

    if (typeof commentId !== 'number' || isNaN(commentId)) {
      console.error('DesktopStickyInput - Invalid comment ID:', commentId);
      throw new Error('Invalid comment ID');
    }

    if (aiCommentsToggleEnabled) {
      handleAiReply(commentId);
    }

    const attemptJump = () => {
      const commentElement = document.querySelector(`.comment-${commentId}`);
      if (commentElement) {
        jumpHighlightComment(commentId);
        return true;
      }
      return false;
    };

    await new Promise((resolve) => setTimeout(resolve, 500));
    attemptJump();

    await new Promise((resolve) => setTimeout(resolve, 1000));
    attemptJump();

    setTimeout(() => {
      if (!attemptJump()) {
        console.error(
          `DesktopStickyInput - Comment element for ID ${commentId} not found in DOM after all attempts`,
        );
      }
    }, 2000);

    return commentId;
  }, [
    handleSubmitComment,
    aiCommentsToggleEnabled,
    handleAiReply,
    setIsExpanded,
  ]);

  const useExpandedEditor = isExpanded || isReplying;

  const editorProps = {
    ...props,
    shouldFocus: true,
    onCancel: handleCancel,
    aiCommentsToggleEnabled,
    setAICommentsToggleEnabled,
    handleSubmitComment: handleEnhancedSubmit,
    onAiReply: handleAiReply,
    streamingReplyIds,
  };

  return (
    <div className="DesktopStickyInput">
      {!useExpandedEditor ? (
        <div className="DesktopStickyInputCollapsed">
          <div className="container">
            <input
              type="text"
              className="form-control"
              placeholder={
                mode === 'thread'
                  ? 'Create a thread...'
                  : replyingToAuthor
                    ? `Reply to ${replyingToAuthor}...`
                    : 'Write a comment...'
              }
              onClick={handleFocused}
            />
          </div>
        </div>
      ) : (
        <div className="DesktopStickyInputExpanded">
          {mode === 'thread' ? (
            <NewThreadForm
              onCancel={handleCancel}
              aiCommentsToggleEnabled={aiCommentsToggleEnabled}
              setAICommentsToggleEnabled={setAICommentsToggleEnabled}
              onAiGenerate={handleAiGenerate}
            />
          ) : (
            <CommentEditor {...editorProps} />
          )}
        </div>
      )}
    </div>
  );
};
