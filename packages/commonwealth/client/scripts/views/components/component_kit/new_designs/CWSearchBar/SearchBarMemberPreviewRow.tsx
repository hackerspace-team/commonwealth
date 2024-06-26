import React, { FC } from 'react';

import { useCommonNavigate } from '../../../../../navigation/helpers';
import { MemberResult } from '../../../../pages/search/helpers';
import { User } from '../../../user/user';

import './SearchBarMemberPreviewRow.scss';

interface SearchBarMemberPreviewRowProps {
  searchResult: MemberResult;
  searchTerm?: string;
  onSearchItemClick?: () => void;
}

export const SearchBarMemberPreviewRow: FC<SearchBarMemberPreviewRowProps> = ({
  searchResult,
  onSearchItemClick,
}) => {
  const community_id = searchResult.addresses[0].community_id;
  const address = searchResult.addresses[0].address;

  const navigate = useCommonNavigate();

  const handleClick = () => {
    navigate(`/profile/id/${searchResult.id}`, {}, null);
    onSearchItemClick?.();
  };

  return (
    <div className="SearchBarMemberPreviewRow" onClick={handleClick}>
      <User
        userAddress={address}
        userCommunityId={community_id}
        shouldShowAsDeleted={!address && !community_id}
        shouldLinkProfile
      />
    </div>
  );
};
