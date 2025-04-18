import clsx from 'clsx';
import useBrowserWindow from 'hooks/useBrowserWindow';
import { isMobileApp } from 'hooks/useReactNativeWebView';
import useWindowResize from 'hooks/useWindowResize';
import React, { useEffect, useState } from 'react';
import { matchRoutes, useLocation, useSearchParams } from 'react-router-dom';
import app from 'state';
import useSidebarStore from 'state/ui/sidebar';
import { SublayoutHeader } from 'views/components/SublayoutHeader';
import { Sidebar } from 'views/components/sidebar';
import { MobileAppOnboardModal } from 'views/modals/MobileAppOnboardModal/MobileAppOnboardModal';
import { useMobileAppOnboarding } from 'views/modals/MobileAppOnboardModal/useMobileAppOnboarding';
import { useFlag } from '../hooks/useFlag';
import { useHandleInviteLink } from '../hooks/useHandleInviteLink';
import useNecessaryEffect from '../hooks/useNecessaryEffect';
import useStickyHeader from '../hooks/useStickyHeader';
import {
  useAuthModalStore,
  useInviteLinkModal,
  useWelcomeOnboardModal,
} from '../state/ui/modals';
import useUserStore from '../state/ui/user';
import './Sublayout.scss';
import { SublayoutBanners } from './SublayoutBanners';
import { AdminOnboardingSlider } from './components/AdminOnboardingSlider';
import { Breadcrumbs } from './components/Breadcrumbs';
import MobileNavigation from './components/MobileNavigation';
import AuthButtons from './components/SublayoutHeader/AuthButtons';
import { CWGrowlTemplate } from './components/SublayoutHeader/GrowlTemplate';
import useJoinCommunity from './components/SublayoutHeader/useJoinCommunity';
import { CWModal } from './components/component_kit/new_designs/CWModal';
import CollapsableSidebarButton from './components/sidebar/CollapsableSidebarButton';
import { AuthModal, AuthModalType } from './modals/AuthModal';
import InviteLinkModal from './modals/InviteLinkModal';
import { WelcomeOnboardModal } from './modals/WelcomeOnboardModal';

type SublayoutProps = {
  hideFooter?: boolean;
  isInsideCommunity?: boolean;
} & React.PropsWithChildren;

const Sublayout = ({ children, isInsideCommunity }: SublayoutProps) => {
  const { menuVisible, setMenu, menuName } = useSidebarStore();
  const [resizing, setResizing] = useState(false);
  const { JoinCommunityModals, handleJoinCommunity } = useJoinCommunity();
  const growlEnabled = useFlag('growl');

  const location = useLocation();

  useStickyHeader({
    elementId: 'mobile-auth-buttons',
    stickyBehaviourEnabled: true,
    zIndex: 70,
  });

  const { isWindowSmallInclusive, isWindowExtraSmall, isWindowSmallToMedium } =
    useBrowserWindow({
      onResize: () => setResizing(true),
      resizeListenerUpdateDeps: [resizing],
    });
  const { authModalType, setAuthModalType } = useAuthModalStore();
  const user = useUserStore();
  const [urlQueryParams] = useSearchParams();
  const { isWelcomeOnboardModalOpen, setIsWelcomeOnboardModalOpen } =
    useWelcomeOnboardModal();

  const { isInviteLinkModalOpen, setIsInviteLinkModalOpen } =
    useInviteLinkModal();

  const [hasMobileAppOnboarding, setHasMobileAppOnboarding] =
    useMobileAppOnboarding();

  const [mobileAppOnboardModalOpen, setMobileAppOnboardModalOpen] =
    useState(false);

  useNecessaryEffect(() => {
    if (Object.fromEntries(urlQueryParams.entries())?.openAuthModal) {
      setAuthModalType(AuthModalType.SignIn);
      urlQueryParams.delete('openAuthModal');
      const newUrl = `${window.location.pathname}`;
      window.history.replaceState(null, '', newUrl);
    }

    if (isMobileApp() && user.isLoggedIn && !hasMobileAppOnboarding) {
      setMobileAppOnboardModalOpen(true);
      return;
    }

    if (
      user.isLoggedIn &&
      !isWelcomeOnboardModalOpen &&
      user.id &&
      !user.isWelcomeOnboardFlowComplete
    ) {
      setIsWelcomeOnboardModalOpen(true);
      return;
    }

    if (!user.isLoggedIn && isWelcomeOnboardModalOpen) {
      setIsWelcomeOnboardModalOpen(false);
      return;
    }
  }, [
    user.id,
    isWelcomeOnboardModalOpen,
    setIsWelcomeOnboardModalOpen,
    user.isLoggedIn,
    user.isWelcomeOnboardFlowComplete,
    hasMobileAppOnboarding,
  ]);

  useHandleInviteLink({ isInsideCommunity, handleJoinCommunity });

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

  const routesWithoutGenericSliders = matchRoutes(
    [
      { path: '/discussions/*' },
      { path: ':scope/discussions/*' },
      { path: '/archived' },
      { path: ':scope/archived' },
    ],
    location,
  );

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
  const terms = app.chain ? chain?.terms : null;
  const banner = app.chain ? chain?.communityBanner : null;
  const showGrowlOnMobile =
    (user.isWelcomeOnboardFlowComplete || !isWindowSmallInclusive) &&
    !(isWindowExtraSmall && isWelcomeOnboardModalOpen);
  return (
    <div className="Sublayout">
      {(!isWindowSmallInclusive || isWindowSmallToMedium) && (
        <CollapsableSidebarButton
          onMobile={isWindowExtraSmall}
          // @ts-expect-error StrictNullChecks
          isInsideCommunity={isInsideCommunity}
        />
      )}
      <SublayoutHeader
        onMobile={isWindowExtraSmall}
        // @ts-expect-error StrictNullChecks
        isInsideCommunity={isInsideCommunity}
        onAuthModalOpen={(modalType) =>
          setAuthModalType(modalType || AuthModalType.SignIn)
        }
      />
      <AuthModal
        type={authModalType}
        onClose={() => setAuthModalType(undefined)}
        isOpen={!!authModalType}
      />
      <div className="sidebar-and-body-container">
        <Sidebar
          // @ts-expect-error StrictNullChecks
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
          <SublayoutBanners banner={banner || ''} terms={terms || ''} />

          <div className="Body">
            <div
              className={clsx('mobile-auth-buttons', {
                isVisible: !user.isLoggedIn && isWindowExtraSmall,
              })}
              id="mobile-auth-buttons"
            >
              <AuthButtons
                fullWidthButtons
                onButtonClick={(selectedType) => setAuthModalType(selectedType)}
              />
            </div>
            {!routesWithoutGenericBreadcrumbs && <Breadcrumbs />}

            {isInsideCommunity && !routesWithoutGenericSliders && (
              <AdminOnboardingSlider />
            )}
            {children}
          </div>
          {growlEnabled && showGrowlOnMobile && (
            <CWGrowlTemplate
              headerText=""
              bodyText=""
              buttonText=""
              buttonLink=""
              growlType=""
              growlImage=""
              extraText=""
            />
          )}
        </div>

        <MobileAppOnboardModal
          onClose={() => {
            setMobileAppOnboardModalOpen(false);
            setHasMobileAppOnboarding(true);
          }}
          isOpen={mobileAppOnboardModalOpen}
        />
        <WelcomeOnboardModal
          isOpen={isWelcomeOnboardModalOpen}
          onClose={() => setIsWelcomeOnboardModalOpen(false)}
        />
        <CWModal
          size="small"
          content={
            <InviteLinkModal
              onModalClose={() => setIsInviteLinkModalOpen(false)}
            />
          }
          open={!isWindowExtraSmall && isInviteLinkModalOpen}
          onClose={() => setIsInviteLinkModalOpen(false)}
        />
        {JoinCommunityModals}
      </div>
      {isWindowExtraSmall && <MobileNavigation />}
    </div>
  );
};

export default Sublayout;
