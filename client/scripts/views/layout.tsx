/* @jsx m */

import m from 'mithril';
import { EmptyState, Icons, Spinner } from 'construct-ui';

import 'index.scss'; // have to inject here instead of app.ts or else fonts don't load
import 'layout.scss';

import {
  initChain,
  initNewTokenChain,
  deinitChainOrCommunity,
  selectNode,
} from 'app';
import app from 'state';
import { AppToasts } from 'views/toast';
import { PageNotFound } from 'views/pages/404';
import { AppModals } from './app_modals';

class LoadingLayout implements m.ClassComponent {
  view() {
    return (
      <div class={`Layout${app.isCustomDomain() ? ' custom-domain' : ''}`}>
        <Spinner active={true} fill={true} size="xl" />
        <AppModals />
        <AppToasts />
      </div>
    );
  }
}

type LayoutAttrs = {
  deferChain?: boolean;
  hideSidebar?: boolean;
  scope: string;
};

export class Layout implements m.ClassComponent<LayoutAttrs> {
  private loadingScope: string;
  private deferred: boolean;

  view(vnode) {
    const { scope, deferChain, hideSidebar } = vnode.attrs;
    const scopeIsEthereumAddress =
      scope && scope.startsWith('0x') && scope.length === 42;

    const scopeMatchesChain = app.config.nodes
      .getAll()
      .find((n) => n.chain.id === scope);

    if (app.loadingError) {
      return (
        <div class={`Layout${app.isCustomDomain() ? ' custom-domain' : ''}`}>
          <EmptyState
            fill={true}
            icon={Icons.ALERT_TRIANGLE}
            content={
              <>
                <p style="color: #222">
                  Application error: ${app.loadingError}
                </p>
                <p style="color: #222">Please try again later</p>
              </>
            }
            style="color: #546e7b;"
          />
          <AppModals />,
          <AppToasts />
        </div>
      );
    } else if (!app.loginStatusLoaded()) {
      // Wait for /api/status to return with the user's login status
      return <LoadingLayout />;
    } else if (scope && scopeIsEthereumAddress && scope !== this.loadingScope) {
      this.loadingScope = scope;
      initNewTokenChain(scope);
      return <LoadingLayout />;
    } else if (scope && !scopeMatchesChain && !scopeIsEthereumAddress) {
      // If /api/status has returned, then app.config.nodes and app.config.communities
      // should both be loaded. If we match neither of them, then we can safely 404
      return (
        <div class={`Layout${app.isCustomDomain() ? ' custom-domain' : ''}`}>
          <PageNotFound />
          <AppModals />
          <AppToasts />
        </div>
      );
    } else if (
      scope &&
      scope !== app.activeChainId() &&
      scope !== this.loadingScope
    ) {
      // If we are supposed to load a new chain or community, we do so now
      // This happens only once, and then loadingScope should be set
      this.loadingScope = scope;
      if (scopeMatchesChain) {
        this.deferred = deferChain;
        selectNode(scopeMatchesChain, deferChain).then((response) => {
          if (!deferChain && response) {
            initChain();
          }
        });
        return <LoadingLayout />;
      }
    } else if (scope && this.deferred && !deferChain) {
      this.deferred = false;
      initChain();
      return <LoadingLayout />;
    } else if (!scope && app.chain && app.chain.network) {
      // Handle the case where we unload the network or community, if we're
      // going to a page that doesn't have one
      // Include this in if for isCustomDomain, scope gets unset on redirect
      // We don't need this to happen
      if (!app.isCustomDomain()) {
        deinitChainOrCommunity().then(() => {
          this.loadingScope = null;
          m.redraw();
        });
      }
      return <LoadingLayout />;
    }
    return (
      <div
        class={`Layout${hideSidebar ? ' hide-sidebar' : ''}${
          app.isCustomDomain() ? ' custom-domain' : ''
        }`}
      >
        {vnode.children}
        <AppModals />
        <AppToasts />
      </div>
    );
  }
}