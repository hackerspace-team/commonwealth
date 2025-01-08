import Web3, { AbiInput, TransactionReceipt, Web3 as Web3Type } from 'web3';

export type EvmClientType = Web3Type;

export const calculateVoteWeight = (
  balance: string, // should be in wei
  voteWeight: number = 0,
  precision: number = 10 ** 18, // precision factor for multiplying
): bigint | null => {
  if (!balance || voteWeight <= 0) return null;
  // solution to multiply BigInt with fractional vote weight
  const scaledVoteWeight = BigInt(Math.round(voteWeight * precision));
  return (BigInt(balance) * scaledVoteWeight) / BigInt(precision);
};

export enum Denominations {
  'ETH' = 'ETH',
}

export const WeiDecimals: Record<Denominations, number> = {
  ETH: 18,
};

export const getAddressFromSignedMessage = (
  message: string,
  signature: string,
): string => {
  const web3 = new Web3();
  return web3.eth.accounts.recover(message, signature);
};

export const getBlock = async ({
  evmClient,
  rpc,
  blockHash,
}: {
  evmClient?: EvmClientType;
  rpc: string;
  blockHash: string;
}) => {
  const web3 = evmClient || new Web3(rpc);
  return {
    block: await web3.eth.getBlock(blockHash),
    evmClient: web3,
  };
};

export const getTransactionReceipt = async ({
  evmClient,
  rpc,
  txHash,
}: {
  evmClient?: EvmClientType;
  rpc: string;
  txHash: string;
}): Promise<{
  txReceipt: TransactionReceipt;
  evmClient: EvmClientType;
}> => {
  const web3 = evmClient || new Web3(rpc);
  return {
    txReceipt: await web3.eth.getTransactionReceipt(txHash),
    evmClient: web3,
  };
};

export const decodeParameters = ({
  evmClient,
  abiInput,
  data,
}: {
  evmClient?: EvmClientType;
  abiInput: AbiInput[];
  data: string;
}) => {
  const web3 = evmClient || new Web3();
  return web3.eth.abi.decodeParameters(abiInput, data);
};

export const createPrivateEvmClient = ({
  rpc,
  privateKey,
}: {
  rpc: string;
  privateKey: string;
}): Web3 => {
  const web3 = new Web3(rpc);
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  return web3;
};
