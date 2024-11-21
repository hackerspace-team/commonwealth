import { commonProtocol } from '@hicommonwealth/shared';
import { Contract } from 'web3';
import { AbiItem } from 'web3-utils';
import {
  buyToken,
  getPrice,
  launchToken,
  sellToken,
  transferLiquidity,
} from '../../../../../../libs/shared/src/commonProtocol';
import ContractBase from './ContractBase';

class LaunchpadBondingCurve extends ContractBase {
  tokenAddress: string;
  launchpadFactoryAddress: string;
  launchpadFactory: Contract<typeof commonProtocol.launchpadFactoryAbi>;
  tokenCommunityManager: string;

  constructor(
    bondingCurveAddress: string,
    launchpadFactoryAddress: string,
    tokenAddress: string,
    tokenCommunityManager: string,
    rpc: string,
  ) {
    super(bondingCurveAddress, commonProtocol.lpBondingCurveAbi, rpc);
    this.tokenAddress = tokenAddress;
    this.launchpadFactoryAddress = launchpadFactoryAddress;
    this.tokenCommunityManager = tokenCommunityManager;
  }

  async initialize(
    withWallet?: boolean,
    chainId?: string | undefined,
  ): Promise<void> {
    await super.initialize(withWallet, chainId);
    this.launchpadFactory = new this.web3.eth.Contract(
      commonProtocol.launchpadFactoryAbi as AbiItem[],
      this.launchpadFactoryAddress,
    ) as unknown as Contract<typeof commonProtocol.launchpadFactoryAbi>;
  }

  async launchToken(
    name: string,
    symbol: string,
    walletAddress: string,
    chainId: string,
    connectorWeight: number = 830000,
  ) {
    if (!this.initialized || !this.walletEnabled) {
      await this.initialize(true, chainId);
    }

    const txReceipt = await launchToken(
      this.launchpadFactory,
      name,
      symbol,
      [], // 9181 parameters
      // should include at community treasury at [0] and contest creation util at [1] curr tbd
      [],
      this.web3.utils.toWei(1e9, 'ether'), // Default 1B tokens
      walletAddress,
      connectorWeight,
      this.tokenCommunityManager,
    );
    return txReceipt;
  }

  async buyToken(amountEth: number, walletAddress: string, chainId: string) {
    if (!this.initialized || !this.walletEnabled) {
      await this.initialize(true, chainId);
    }

    const txReceipt = await buyToken(
      this.contract,
      this.tokenAddress,
      walletAddress,
      amountEth,
    );
    return txReceipt;
  }

  async sellToken(amountSell: number, walletAddress: string, chainId: string) {
    if (!this.initialized || !this.walletEnabled) {
      await this.initialize(true, chainId);
    }
    const tokenContract = new this.web3.eth.Contract(
      commonProtocol.erc20Abi as unknown as AbiItem[],
      this.tokenAddress,
    );
    const txReceipt = await sellToken(
      this.contract,
      this.tokenAddress,
      amountSell,
      walletAddress,
      tokenContract,
    );
    return txReceipt;
  }

  async transferLiquidity(walletAddress: string) {
    if (!this.initialized || !this.walletEnabled) {
      await this.initialize(true);
    }

    const txReceipt = await transferLiquidity(
      this.contract,
      this.tokenAddress,
      walletAddress,
    );
    return txReceipt;
  }

  async getAmountOut(amountIn: number, buy: boolean, chainId: string) {
    if (!this.initialized || !this.walletEnabled) {
      await this.initialize(true, chainId);
    }

    const amountOut = await getPrice(
      this.contract,
      this.tokenAddress,
      amountIn,
      buy,
    );
    return Number(amountOut) / 1e18;
  }
}

export default LaunchpadBondingCurve;
