import React from 'react';
import { Link } from 'react-router-dom';

import { useUserStore } from 'state/ui/user/user';
import { saveToClipboard } from 'utils/clipboard';

import { APIOrderDirection } from 'helpers/constants';
import { Avatar } from '../../Avatar';
import { CWIcon } from '../../component_kit/cw_icons/cw_icon';
import { CWTable } from '../../component_kit/new_designs/CWTable';
import { CWTableColumnInfo } from '../../component_kit/new_designs/CWTable/CWTable';
import { useCWTableState } from '../../component_kit/new_designs/CWTable/useCWTableState';
import { CWTextInput } from '../../component_kit/new_designs/CWTextInput';

import { CWText } from '../../component_kit/cw_text';
import './ReferralsTab.scss';

const fakeData = [
  {
    user: {
      name: 'cambell',
      avatarUrl:
        'https://assets.commonwealth.im/794bb7a3-17d7-407a-b52e-2987501221b5.png',
      userId: '128606',
      address: 'address1',
    },
    earnings: '5.3',
  },
  {
    user: {
      name: 'adam',
      avatarUrl:
        'https://assets.commonwealth.im/0847e7f5-4d96-4406-8f30-c3082fa2f27c.png',
      userId: '135099',
      address: 'address2',
    },
    earnings: '1.9',
  },
  {
    user: {
      name: 'mike',
      avatarUrl:
        'https://assets.commonwealth.im/181e25ad-ce08-427d-8d3a-d290af3be44b.png',
      userId: '158139',
      address: 'address3',
    },
    earnings: '0.1',
  },
];

const columns: CWTableColumnInfo[] = [
  {
    key: 'member',
    header: 'Member',
    numeric: false,
    sortable: true,
  },

  {
    key: 'earnings',
    header: 'Earnings',
    numeric: true,
    sortable: true,
  },
];

interface ReferralsTabProps {
  isOwner: boolean | undefined;
}

const ReferralsTab = ({ isOwner }: ReferralsTabProps) => {
  const user = useUserStore();

  const tableState = useCWTableState({
    columns,
    initialSortColumn: 'earnings',
    initialSortDirection: APIOrderDirection.Desc,
  });

  // TODO: replace with actual invite link from backend in upcoming PR
  const inviteLink = 'https://commonwealth.im/~/invite/774037=89defcb8';

  const handleCopy = () => {
    saveToClipboard(inviteLink, true).catch(console.error);
  };

  const isCurrentUser = user.isLoggedIn && isOwner;

  return (
    <div className="ReferralsTab">
      {isCurrentUser && (
        <CWTextInput
          label="Personal Referral Link"
          instructionalMessage="Community-specific referral links can be found +
          on the sidebar of your joined communities."
          fullWidth
          type="text"
          value={inviteLink}
          readOnly
          onClick={handleCopy}
          iconRight={<CWIcon iconName="copy" />}
        />
      )}

      <CWTable
        columnInfo={tableState.columns}
        sortingState={tableState.sorting}
        setSortingState={tableState.setSorting}
        rowData={fakeData.map((item) => ({
          ...item,
          member: {
            sortValue: item.user.name.toLowerCase(),
            customElement: (
              <div className="table-cell">
                <Link
                  to={`/profile/id/${item.user.userId}`}
                  className="user-info"
                >
                  <Avatar
                    url={item.user.avatarUrl ?? ''}
                    size={24}
                    address={+item.user.address}
                  />
                  <p>{item.user.name}</p>
                </Link>
              </div>
            ),
          },
          earnings: {
            sortValue: item.earnings,
            customElement: (
              <div className="table-cell text-right">USD {item.earnings}</div>
            ),
          },
        }))}
      />
      <div className="referral-totals">
        <CWText type="b2" fontWeight="bold">
          Total
        </CWText>
        <CWText type="b2">USD 10.30</CWText>
      </div>
    </div>
  );
};

export default ReferralsTab;
