import { CWText } from 'client/scripts/views/components/component_kit/cw_text';
import { WEI_PER_ETHER } from 'controllers/chain/ethereum/util';
import { APIOrderDirection } from 'helpers/constants';
import React from 'react';
import CommunityInfo from 'views/components/component_kit/CommunityInfo';
import { CWIcon } from 'views/components/component_kit/cw_icons/cw_icon';
import { CWTable } from 'views/components/component_kit/new_designs/CWTable';
import { CWTableColumnInfo } from 'views/components/component_kit/new_designs/CWTable/CWTable';
import { useCWTableState } from 'views/components/component_kit/new_designs/CWTable/useCWTableState';
import { TransactionsProps } from '../../types';
import './Stakes.scss';

const columns: CWTableColumnInfo[] = [
  {
    key: 'community',
    header: 'Community',
    numeric: false,
    sortable: true,
    hasCustomSortValue: true,
  },
  {
    key: 'stake',
    header: 'Stake',
    numeric: false,
    sortable: true,
    hasCustomSortValue: true,
  },
  // {
  //   key: 'avgPrice',
  //   header: 'Avg. price',
  //   numeric: true,
  //   sortable: true,
  // },
  {
    key: 'etherscanLink',
    header: () => <CWIcon iconName="etherscan" iconSize="regular" />,
    numeric: false,
    sortable: false,
  },
];

const Stakes = ({ transactions }: TransactionsProps) => {
  const tableState = useCWTableState({
    columns,
    initialSortColumn: 'voteWeight',
    initialSortDirection: APIOrderDirection.Desc,
  });

  // aggregate transaction per community per address
  const stakes = (() => {
    const accumulatedStakes = {};

    transactions.map((transaction) => {
      const key = (
        transaction.community.id + transaction.address
      ).toLowerCase();
      const action = transaction.action === 'mint' ? 1 : -1;

      accumulatedStakes[key] = {
        ...transaction,
        ...(accumulatedStakes[key] || {}),
        chain: transaction?.community?.chain_node_name,
        stake:
          (accumulatedStakes[key]?.stake || 0) + transaction.stake * action,
        voteWeight:
          (accumulatedStakes[key]?.voteWeight || 0) +
          transaction.voteWeight * action,
        avgPrice:
          (accumulatedStakes[key]?.avgPrice || 0) +
          parseFloat(
            (
              parseFloat(transaction.price) /
              WEI_PER_ETHER /
              transaction.stake
            ).toFixed(5),
          ) *
            action,
      };
    });

    return (
      Object.values(accumulatedStakes)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((transaction: any) => ({
          ...transaction,
          voteWeight: transaction.voteWeight + 1, // total vote weight is +1 of the stake weight
          avgPrice: `${transaction.avgPrice.toFixed(5)} ${'ETH'}`,
        }))
        .filter((transaction) => transaction.stake > 0)
    );
  })();

  return (
    <section className="Stakes">
      <CWTable
        columnInfo={tableState.columns}
        sortingState={tableState.sorting}
        setSortingState={tableState.setSorting}
        rowData={stakes.map((tx) => ({
          ...tx,
          community: {
            sortValue: tx.community.name.toLowerCase(),
            customElement: (
              <CommunityInfo
                symbol={tx.community.default_symbol}
                iconUrl={tx.community.icon_url}
                name={tx.community.name}
                communityId={tx.community.id}
              />
            ),
          },
          stake: {
            sortValue: tx.stake,
            customElement: (
              <div className="stake-value">
                <CWText type="b1" fontWeight="semiBold">
                  {tx.stake} /
                </CWText>
                <CWText type="caption">{tx.avgPrice}</CWText>
              </div>
            ),
          },
          etherscanLink: {
            customElement: (
              <a
                target="_blank"
                rel="noreferrer"
                href={tx.etherscanLink}
                onClick={(e) => e.stopPropagation()}
              >
                <CWIcon iconName="externalLink" className="etherscanLink" />
              </a>
            ),
          },
        }))}
      />
    </section>
  );
};

export { Stakes };
