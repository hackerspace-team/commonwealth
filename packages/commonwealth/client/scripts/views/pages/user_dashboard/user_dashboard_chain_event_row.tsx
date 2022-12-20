/* @jsx m */
import m from 'mithril';


import { ClassComponent, ResultNode, render, setRoute, getRoute, getRouteParam, redraw, Component } from 'mithrilInterop';

import 'pages/user_dashboard/user_dashboard_chain_event_row.scss';

import { ChainInfo } from 'models';
import { IEventLabel } from '../../../../../../chain-events/src';
import { CWCommunityAvatar } from '../../components/component_kit/cw_community_avatar';
import { CWText } from '../../components/component_kit/cw_text';
import { getClasses } from '../../components/component_kit/helpers';

type UserDashboardChainEventRowAttrs = {
  blockNumber: number;
  chain: ChainInfo;
  label: IEventLabel;
};

export class UserDashboardChainEventRow extends ClassComponent<UserDashboardChainEventRowAttrs> {
  view(vnode: ResultNode<UserDashboardChainEventRowAttrs>) {
    const { blockNumber, chain, label } = vnode.attrs;

    return (
      <div
        class={getClasses<{ isLink?: boolean }>(
          { isLink: !!label.linkUrl },
          'UserDashboardChainEventRow'
        )}
        onclick={() => {
          if (label.linkUrl) {
            setRoute(label.linkUrl);
          }
          redraw();
        }}
      >
        <CWCommunityAvatar community={chain} />
        <div class="chain-event-text-container">
          <CWText className="row-top-text">
            <b>{label.heading}</b>
            <span>in</span>
            <a
              onclick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setRoute(`/${chain}`);
              }}
            >
              {chain?.name || 'Unknown chain'}
            </a>
            <span class="block-number">Block {blockNumber}</span>
          </CWText>
          <CWText>{label.label}</CWText>
        </div>
      </div>
    );
  }
}
