import { useFlag } from 'hooks/useFlag';
import moment from 'moment';
import React, { useState } from 'react';
import { FarcasterEmbed } from 'react-farcaster-embed/dist/client';
import 'react-farcaster-embed/dist/styles.css';
import useFetchFarcasterCastsQuery from 'state/api/contests/getFarcasterCasts';
import { Select } from 'views/components/Select';
import { Skeleton } from 'views/components/Skeleton';
import { CWText } from 'views/components/component_kit/cw_text';
import CWPageLayout from 'views/components/component_kit/new_designs/CWPageLayout';
import CWUpvoteSmall from 'views/components/component_kit/new_designs/CWUpvoteSmall';
import { CWUpvote } from 'views/components/component_kit/new_designs/cw_upvote';
import { PageNotFound } from 'views/pages/404';
import ContestCard from 'views/pages/CommunityManagement/Contests/ContestsList/ContestCard';
import useCommunityContests from 'views/pages/CommunityManagement/Contests/useCommunityContests';

import { CWButton } from '../../components/component_kit/new_designs/CWButton';
import { CWMobileTab } from '../../components/component_kit/new_designs/CWMobileTab';
import FundContestDrawer from '../CommunityManagement/Contests/FundContestDrawer';

import './ContestPage.scss';

export enum SortType {
  Upvotes = 'upvotes',
  Recent = 'recent',
}

const sortOptions = [
  {
    value: SortType.Upvotes,
    label: 'Most Upvoted',
  },
  {
    value: SortType.Recent,
    label: 'Most Recent',
  },
];

export enum MobileTabType {
  Entries = 'Entries',
  PriceChart = 'Price Chart',
  TokenSwap = 'Token Swap',
}

interface ContestPageProps {
  contestAddress: string;
}

const ContestPage = ({ contestAddress }: ContestPageProps) => {
  const newContestPageEnabled = useFlag('newContestPage');
  const { getContestByAddress, isContestDataLoading } = useCommunityContests();
  const contest = getContestByAddress(contestAddress);

  const [fundDrawerContest, setFundDrawerContest] = useState<
    typeof contest | null
  >();
  const [selectedSort, setSelectedSort] = useState<SortType>(
    sortOptions[0].value,
  );

  const { data: farcasterCasts, isLoading: isFarcasterCastsLoading } =
    useFetchFarcasterCastsQuery({
      contest_address: contestAddress,
      selectedSort,
    });

  const [selectedMobileTab, setSelectedMobileTab] = useState<MobileTabType>(
    MobileTabType.Entries,
  );

  if (!isContestDataLoading && !contest) {
    return <PageNotFound />;
  }

  const { end_time } = contest?.contests[0] || {};

  if (newContestPageEnabled) {
    return (
      <CWPageLayout>
        <div className="NewContestPage">
          <div className="top-container">
            {contest && (
              <ContestCard
                key={contest?.contest_address}
                isAdmin={false}
                address={contest?.contest_address}
                name={contest?.name}
                imageUrl={contest?.image_url || ''}
                topics={contest?.topics}
                decimals={contest?.decimals}
                ticker={contest?.ticker}
                finishDate={end_time ? moment(end_time).toISOString() : ''}
                isCancelled={!!contest?.cancelled}
                isRecurring={!contest?.funding_token_address}
                isHorizontal
                showShareButton={false}
                showLeaderboardButton={false}
                payoutStructure={contest?.payout_structure}
                isFarcaster={contest?.is_farcaster_contest}
                onFund={() => setFundDrawerContest(contest)}
              />
            )}

            <div className="navigation-buttons">
              <CWButton
                buttonType="secondary"
                iconLeft="arrowLeftPhosphor"
                label="Previous Contest"
                onClick={() => {
                  console.log('previous contest');
                }}
                containerClassName="previous-btn"
              />
              <CWButton
                label={contest?.name}
                containerClassName="contest-name"
              />
              <CWButton
                buttonType="secondary"
                label="Next Contest"
                iconRight="arrowRightPhosphor"
                onClick={() => {
                  console.log('next contest');
                }}
                containerClassName="next-btn"
              />
            </div>
          </div>

          <div className="mobile-tabs">
            <CWMobileTab
              label={MobileTabType.Entries}
              icon="trophy"
              isActive={selectedMobileTab === MobileTabType.Entries}
              onClick={() => {
                setSelectedMobileTab(MobileTabType.Entries);
              }}
            />
            <CWMobileTab
              label={MobileTabType.PriceChart}
              icon="trophy"
              isActive={selectedMobileTab === MobileTabType.PriceChart}
              onClick={() => {
                setSelectedMobileTab(MobileTabType.PriceChart);
              }}
            />
            <CWMobileTab
              label={MobileTabType.TokenSwap}
              icon="trophy"
              isActive={selectedMobileTab === MobileTabType.TokenSwap}
              onClick={() => {
                setSelectedMobileTab(MobileTabType.TokenSwap);
              }}
            />
          </div>

          <div className="mobile-tab-content">
            {selectedMobileTab === MobileTabType.Entries && <div>Entries</div>}
            {selectedMobileTab === MobileTabType.PriceChart && (
              <div>Price Chart</div>
            )}
            {selectedMobileTab === MobileTabType.TokenSwap && (
              <div>Token Swap</div>
            )}
          </div>
        </div>
        <FundContestDrawer
          onClose={() => setFundDrawerContest(undefined)}
          isOpen={!!fundDrawerContest}
          contestAddress={fundDrawerContest?.contest_address || ''}
          fundingTokenAddress={fundDrawerContest?.funding_token_address || ''}
          fundingTokenTicker={fundDrawerContest?.ticker || 'ETH'}
        />
      </CWPageLayout>
    );
  }

  return (
    <CWPageLayout>
      <div className="ContestPage">
        <CWText type="h2">Leaderboard</CWText>
        <CWText className="description">
          Check out the contest details including leaderboard.
        </CWText>
        {contest && (
          <ContestCard
            key={contest?.contest_address}
            isAdmin={false}
            address={contest?.contest_address}
            name={contest?.name}
            imageUrl={contest?.image_url || ''}
            topics={contest?.topics}
            decimals={contest?.decimals}
            ticker={contest?.ticker}
            finishDate={end_time ? moment(end_time).toISOString() : ''}
            isCancelled={!!contest?.cancelled}
            isRecurring={!contest?.funding_token_address}
            isHorizontal
            showShareButton={false}
            showLeaderboardButton={false}
            payoutStructure={contest?.payout_structure}
            isFarcaster={contest?.is_farcaster_contest}
            onFund={() => setFundDrawerContest(contest)}
          />
        )}

        <div className="leaderboard-list">
          {isFarcasterCastsLoading ? (
            <>
              <Skeleton height={300} width="100%" />
              <Skeleton height={300} width="100%" />
            </>
          ) : !farcasterCasts?.length ? (
            <CWText>No entries for the contest yet</CWText>
          ) : (
            <>
              <div className="filter-section">
                <CWText type="b2" fontWeight="medium">
                  Sort
                </CWText>
                <Select
                  selected={selectedSort}
                  onSelect={(v: { value: string; label: string }) =>
                    setSelectedSort(v.value as SortType)
                  }
                  options={sortOptions}
                />
              </div>

              {farcasterCasts.map((entry) => {
                return (
                  <div key={entry.hash} className="cast-container">
                    <CWUpvote
                      disabled
                      voteCount={entry.calculated_vote_weight || '0'}
                    />

                    <div className="upvote-small">
                      <CWUpvoteSmall
                        voteCount={entry.calculated_vote_weight || '0'}
                        disabled
                        selected={false}
                        onClick={() => undefined}
                        popoverContent={<></>}
                        tooltipText="Farcaster Upvotes"
                      />
                    </div>

                    <FarcasterEmbed
                      key={entry.hash}
                      hash={entry.hash}
                      username={entry.author.username}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <FundContestDrawer
        onClose={() => setFundDrawerContest(undefined)}
        isOpen={!!fundDrawerContest}
        contestAddress={fundDrawerContest?.contest_address || ''}
        fundingTokenAddress={fundDrawerContest?.funding_token_address || ''}
        fundingTokenTicker={fundDrawerContest?.ticker || 'ETH'}
      />
    </CWPageLayout>
  );
};

export default ContestPage;
