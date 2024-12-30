import { ServerError } from '@hicommonwealth/core';
import {
  buildFarcasterContestFrameUrl,
  commonProtocol,
} from '@hicommonwealth/shared';
import { config } from '../../build/config';
import { models } from '../database';
import { mustExist } from '../middleware/guards';
import { TokenAttributes } from '../services';
import { contractHelpers } from '../services/commonProtocol';
import { deployERC20Contest } from '../services/commonProtocol/contestHelper';
import { parseBotCommand } from '../services/openai/parseBotCommand';

export const ContestBot = async (prompt: string, chain_id: number) => {
  const contestMetadata = await parseBotCommand(prompt);

  const namespaceFactory = commonProtocol.factoryContracts[chain_id].factory;
  const botNamespace = config.BOT.CONTEST_BOT_NAMESPACE;

  if (botNamespace === '') {
    new ServerError('bot not enabled on given chain');
  }

  const community = await models.Community.scope('withPrivateData').findOne({
    where: {
      namespace: botNamespace,
    },
  });

  if (!community) {
    new ServerError('Community not created for namespace');
  }

  let tokenMetadata: TokenAttributes;
  try {
    tokenMetadata = await contractHelpers.getTokenAttributes(
      contestMetadata.tokenAddress,
      community!.ChainNode!.private_url!,
      false,
    );
  } catch {
    new ServerError('invalid token address');
  }

  const contestAddress = await deployERC20Contest(
    botNamespace,
    604800,
    contestMetadata.payoutStructure,
    contestMetadata.tokenAddress,
    contestMetadata.voterShare,
    contestMetadata.tokenAddress,
    namespaceFactory,
    community!.ChainNode!.private_url!,
  );

  const contestManager = await models.sequelize.transaction(
    async (transaction) => {
      const manager = await models.ContestManager.create(
        {
          name: contestMetadata.contestName,
          community_id: community!.id,
          created_at: new Date(),
          cancelled: false,
          farcaster_frame_url: buildFarcasterContestFrameUrl(contestAddress),
          is_farcaster_contest: true,
          image_url: contestMetadata.image_url,
          interval: 604800,
          funding_token_address: contestMetadata.tokenAddress,
          payout_structure: contestMetadata.payoutStructure,
          ticker: tokenMetadata.ticker,
          decimals: tokenMetadata.decimals,
        },
        { transaction },
      );
      return manager;
    },
  );

  mustExist('Contest Manager', contestManager);
};
