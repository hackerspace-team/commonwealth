import 'Sublayout.scss';
import clsx from 'clsx';
import useBrowserWindow from 'hooks/useBrowserWindow';
import useForceRerender from 'hooks/useForceRerender';
import useWindowResize from 'hooks/useWindowResize';
import React, { useEffect, useState } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';
import app from 'state';
import useSidebarStore from 'state/ui/sidebar';
import { SublayoutHeader } from 'views/components/SublayoutHeader';
import { Sidebar } from 'views/components/sidebar';
import { useFlag } from '../hooks/useFlag';
import useNecessaryEffect from '../hooks/useNecessaryEffect';
import useUserLoggedIn from '../hooks/useUserLoggedIn';
import { useWelcomeOnboardModal } from '../state/ui/modals';
import { Footer } from './Footer';
import { SublayoutBanners } from './SublayoutBanners';
import { AdminOnboardingSlider } from './components/AdminOnboardingSlider';
import { Breadcrumbs } from './components/Breadcrumbs';
import MobileNavigation from './components/MobileNavigation';
import { UserSurveyGrowl } from './components/UserSurveyGrowl/UserSurveyGrowl';
import CollapsableSidebarButton from './components/sidebar/CollapsableSidebarButton';
import { WelcomeOnboardModal } from './modals/WelcomeOnboardModal';

type SublayoutProps = {
  hideFooter?: boolean;
  isInsideCommunity?: boolean;
} & React.PropsWithChildren;

const Sublayout = ({
  children,
  hideFooter = true,
  isInsideCommunity,
}: SublayoutProps) => {
  const { isLoggedIn } = useUserLoggedIn();
  const forceRerender = useForceRerender();
  const { menuVisible, setMenu, menuName } = useSidebarStore();
  const [resizing, setResizing] = useState(false);
  const { isWindowSmallInclusive, isWindowExtraSmall } = useBrowserWindow({
    onResize: () => setResizing(true),
    resizeListenerUpdateDeps: [resizing],
  });

  const { isWelcomeOnboardModalOpen, setIsWelcomeOnboardModalOpen } =
    useWelcomeOnboardModal();
  const userOnboardingEnabled = useFlag('userOnboardingEnabled');

  useNecessaryEffect(() => {
    if (isLoggedIn && userOnboardingEnabled && !isWelcomeOnboardModalOpen) {
      // if a single user address has a set `username` (not defaulting to `Anonymous`), then user is onboarded
      const hasUsername = app?.user?.addresses?.find(
        (addr) => addr?.profile?.name && addr.profile?.name !== 'Anonymous',
      );

      // open welcome modal if user is not onboarded
      if (!hasUsername) {
        setIsWelcomeOnboardModalOpen(true);
      }
    }

    if (!isLoggedIn && isWelcomeOnboardModalOpen) {
      setIsWelcomeOnboardModalOpen(false);
    }
  }, [
    userOnboardingEnabled,
    isWelcomeOnboardModalOpen,
    setIsWelcomeOnboardModalOpen,
    isLoggedIn,
  ]);

  const location = useLocation();

  useWindowResize({
    setMenu,
  });

  const routesWithoutGenericBreadcrumbs = matchRoutes(
    [
      { path: '/discussions/*' },
      { path: ':scope/discussions/*' },
      { path: '/archived' },
      { path: ':scope/archived' },
    ],
    location,
  );

  useEffect(() => {
    app.sidebarRedraw.on('redraw', forceRerender);

    return () => {
      app.sidebarRedraw.off('redraw', forceRerender);
    };
  }, [forceRerender]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resizing) {
      timer = setTimeout(() => {
        setResizing(false);
      }, 200); // Adjust delay as needed
    }

    return () => {
      clearTimeout(timer);
    };
  }, [resizing]);

  const chain = app.chain ? app.chain.meta : null;
  const terms = app.chain ? chain.terms : null;
  const banner = app.chain ? chain.communityBanner : null;

  return (
    <div className="Sublayout">
      {!isWindowSmallInclusive && (
        <CollapsableSidebarButton
          onMobile={isWindowExtraSmall}
          isInsideCommunity={isInsideCommunity}
        />
      )}
      <SublayoutHeader
        onMobile={isWindowExtraSmall}
        isInsideCommunity={isInsideCommunity}
      />
      <div className="sidebar-and-body-container">
        <Sidebar
          isInsideCommunity={isInsideCommunity}
          onMobile={isWindowExtraSmall}
        />
        <div
          className={clsx(
            'body-and-sticky-headers-container',
            {
              'menu-visible': menuVisible,
              'menu-hidden': !menuVisible,
              'quick-switcher-visible':
                menuName === 'exploreCommunities' ||
                menuName === 'createContent' ||
                isInsideCommunity,
            },
            resizing,
          )}
        >
          <SublayoutBanners banner={banner} chain={chain} terms={terms} />

          <div className="Body">
            {!routesWithoutGenericBreadcrumbs && <Breadcrumbs />}
            {isInsideCommunity && <AdminOnboardingSlider />}
            {children}
            {!app.isCustomDomain() && !hideFooter && <Footer />}
          </div>
        </div>
        <UserSurveyGrowl />
        {userOnboardingEnabled && (
          <WelcomeOnboardModal
            isOpen={isWelcomeOnboardModalOpen}
            onClose={() =>
              setIsWelcomeOnboardModalOpen(!isWelcomeOnboardModalOpen)
            }
          />
        )}
      </div>
      {isWindowExtraSmall && <MobileNavigation />}
    </div>
  );
};

export default Sublayout;
