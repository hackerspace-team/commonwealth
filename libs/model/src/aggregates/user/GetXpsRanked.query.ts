import { type Query } from '@hicommonwealth/core';
import * as schemas from '@hicommonwealth/schemas';
import { QueryTypes } from 'sequelize';
import { z } from 'zod';
import { models } from '../../database';

type RankedUser = z.infer<typeof schemas.XpRankedUser>;

export function GetXpsRanked(): Query<typeof schemas.GetXpsRanked> {
  return {
    ...schemas.GetXpsRanked,
    auth: [],
    secure: false,
    body: async ({ payload }) => {
      const { top, quest_id } = payload;
      const query = quest_id
        ? `
with top as (
	select
		user_id,
		sum(xp_points) as xp_points,
    0 as xp_referrer_points -- TODO: add referrer points
	from "XpLogs" l
		join  "QuestActionMetas" m on l.action_meta_id = m.id
		join "Quests" q on m.quest_id = q.id
	where q.id = :quest_id
	group by user_id
	order by 2 desc
	limit :top
)
select
 	top.*,
 	u.tier,
 	u.profile->>'name' as user_name,
 	u.profile->>'avatar_url' as avatar_url
from
	top
	join "Users" u on top.user_id = u.id;
`
        : `
select
 	id as user_id,
 	xp_points,
 	xp_referrer_points,
 	tier,
 	profile->>'name' as user_name,
 	profile->>'avatar_url' as avatar_url
from
	"Users"
order by
	xp_points + xp_referrer_points desc
limit :top;
`;
      return await models.sequelize.query<RankedUser>(query, {
        replacements: quest_id ? { quest_id, top } : { top },
        type: QueryTypes.SELECT,
      });
    },
  };
}
