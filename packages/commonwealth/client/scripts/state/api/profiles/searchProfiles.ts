import {
  APIOrderBy,
  APIOrderDirection,
} from 'client/scripts/helpers/constants';
import { trpc } from 'client/scripts/utils/trpcClient';

const SEARCH_PROFILES_STALE_TIME = 60 * 1_000; // 60 s

interface SearchProfilesProps {
  communityId: string;
  searchTerm: string;
  limit: number;
  orderBy?: APIOrderBy;
  orderDirection?: APIOrderDirection;
  enabled?: boolean;
  exactMatch?: boolean;
}

const useSearchProfilesQuery = ({
  communityId,
  searchTerm,
  limit,
  orderBy,
  orderDirection,
  exactMatch = false,
  enabled = true,
}: SearchProfilesProps) => {
  return trpc.user.searchUserProfiles.useInfiniteQuery(
    {
      search: searchTerm,
      community_id: communityId,
      limit,
      order_by: orderBy,
      order_direction: orderDirection,
      exact_match: exactMatch,
    },
    {
      getNextPageParam: (lastPage) => {
        const nextPageNum = lastPage.page + 1;
        if (nextPageNum <= lastPage.totalPages) {
          return nextPageNum;
        }
        return undefined;
      },
      staleTime: SEARCH_PROFILES_STALE_TIME,
      enabled: enabled,
    },
  );
};

export default useSearchProfilesQuery;
