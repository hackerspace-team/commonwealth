/* @jsx m */

import 'components/reaction_button/comment_reaction_button.scss';

import m from 'mithril';
import app from 'state';
import TopicGateCheck from 'controllers/chain/ethereum/gatedTopic';
import { Thread, ChainInfo } from 'models';
import { Popover } from 'construct-ui';
import { CWIcon } from '../component_kit/cw_icons/cw_icon';
import {
  fetchReactionsByPost,
  getDisplayedReactorsForPopup,
  onReactionClick,
} from './helpers';

type ThreadReactionButtonAttrs = {
  thread: Thread;
};

export class ThreadReactionButton
  implements m.ClassComponent<ThreadReactionButtonAttrs>
{
  private loading: boolean;
  private reactors: any;

  oninit() {
    this.loading = false;
  }

  view(vnode: m.VnodeDOM<ThreadReactionButtonAttrs, this>) {
    const { thread } = vnode.attrs;
    const reactionCounts = app.reactionCounts.store.getByPost(thread);
    const { likes = 0, hasReacted } = reactionCounts || {};

    // token balance check if needed
    const isAdmin =
      app.user.isSiteAdmin ||
      app.user.isAdminOfEntity({ chain: app.activeChainId() });

    let topicName = '';

    if (thread instanceof Thread && thread.topic && app.topics) {
      topicName = thread.topic.name;
    }

    this.loading =
      this.loading || (!isAdmin && TopicGateCheck.isGatedTopic(topicName));

    const activeAddress = app.user.activeAccount?.address;

    const dislike = async (userAddress: string) => {
      const reaction = (await fetchReactionsByPost(thread)).find((r) => {
        return r.Address.address === activeAddress;
      });
      this.loading = true;
      app.reactionCounts
        .delete(reaction, {
          ...reactionCounts,
          likes: likes - 1,
          hasReacted: false,
        })
        .then(() => {
          this.reactors = this.reactors.filter(
            ({ Address }) => Address.address !== userAddress
          );
          this.loading = false;
          m.redraw();
        });
    };

    const like = (chain: ChainInfo, chainId: string, userAddress: string) => {
      this.loading = true;
      app.reactionCounts
        .create(userAddress, thread, 'like', chainId)
        .then(() => {
          this.loading = false;
          this.reactors = [
            ...this.reactors,
            {
              Address: { address: userAddress, chain },
            },
          ];
          m.redraw();
        });
    };

    const reactionButtonComponent = (
      <div
        onmouseenter={async () => {
          this.reactors = await fetchReactionsByPost(thread);
        }}
        onclick={async (e) =>
          onReactionClick(e, hasReacted, dislike, like, thread)
        }
        class={`CommentReactionButton${this.loading ? ' disabled' : ''}${
          hasReacted ? ' has-reacted' : ''
        }`}
      >
        <CWIcon iconName={hasReacted ? 'heartFilled' : 'heartEmpty'} />
        <div class="reactions-count">{likes}</div>
      </div>
    );

    return likes > 0 ? (
      <Popover
        interactionType="hover"
        content={
          <div class="reaction-button-tooltip-contents">
            {getDisplayedReactorsForPopup({
              likes,
              reactors: this.reactors,
            })}
          </div>
        }
        trigger={reactionButtonComponent}
        hoverOpenDelay={100}
      />
    ) : (
      reactionButtonComponent
    );
  }
}