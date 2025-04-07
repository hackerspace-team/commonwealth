import { useMutation } from '@tanstack/react-query';

import { commonProtocol } from '@hicommonwealth/evm-protocols';
import Contest from 'helpers/ContractHelpers/Contest';

export interface DeploySingleJudgedContestOnchainProps {
  ethChainId: number;
  chainRpc: string;
  namespaceName: string;
  contestInterval: number;
  winnerShares: number[];
  voterShare: number;
  walletAddress: string;
  exchangeToken: string;
}

const deploySingleJudgedContestOnchain = async ({
  ethChainId,
  chainRpc,
  namespaceName,
  contestInterval,
  winnerShares,
  voterShare,
  walletAddress,
  exchangeToken,
}: DeploySingleJudgedContestOnchainProps) => {
  const contest = new Contest(
    '',
    commonProtocol.factoryContracts[ethChainId].factory,
    chainRpc,
    ethChainId,
  );

  return await contest.newSingleJudgedContest(
    namespaceName,
    contestInterval,
    winnerShares,
    voterShare,
    walletAddress,
    exchangeToken,
  );
};

const useDeploySingleJudgedContestOnchainMutation = () => {
  return useMutation({
    mutationFn: deploySingleJudgedContestOnchain,
  });
};

export default useDeploySingleJudgedContestOnchainMutation;
