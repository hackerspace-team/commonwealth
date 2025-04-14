import { getChainName } from '@hicommonwealth/evm-protocols';
import { notifyError } from 'controllers/app/notifications';
import { useEffect, useState } from 'react';

export const chainNames: Record<string, string> = {
  '0x1': 'Ethereum',
  '0x89': 'Polygon',
  '0xa': 'Optimism',
  '0xa4b1': 'Arbitrum',
  '0x2105': 'Base',
  '0x14a33': 'Base Goerli',
  '0x14a34': 'Base Sepolia',
  '0x7a69': 'Anvil',
};

interface UseNetworkSwitchingProps {
  ethChainId?: number | null;
  rpcUrl?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider?: any;
}

export function useNetworkSwitching({
  ethChainId,
  rpcUrl,
  provider,
}: UseNetworkSwitchingProps) {
  const [currentChain, setCurrentChain] = useState<string | undefined>(
    undefined,
  );
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const windowEthereum = window as any;

  // Check current network and update state
  useEffect(() => {
    const checkCurrentNetwork = async () => {
      // Use any available provider to check current network
      const activeProvider =
        windowEthereum.ethereum ||
        provider?.provider ||
        (rpcUrl ?? { request: () => null });

      if (!activeProvider) return;

      try {
        // Get current chain ID
        const currentChainIdHex = await activeProvider.request({
          method: 'eth_chainId',
        });

        const formattedChainId = ethChainId
          ? `0x${Number(ethChainId).toString(16)}`
          : null;

        // Set current chain name
        setCurrentChain(`Chain ID ${getChainName({ hex: currentChainIdHex })}`);

        // Check if on the wrong network
        setIsWrongNetwork(
          formattedChainId !== null && currentChainIdHex !== formattedChainId,
        );
      } catch (error) {
        console.error('Failed to check current network:', error);
      }
    };

    void checkCurrentNetwork();
  }, [ethChainId, provider, rpcUrl, windowEthereum]);

  const promptNetworkSwitch = async () => {
    if (!isWrongNetwork || !windowEthereum.ethereum) return;

    const chainHex = `0x${Number(ethChainId).toString(16)}`;

    try {
      // Try to switch to Base network
      await windowEthereum.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainHex }],
      });

      // Update status after switching
      setIsWrongNetwork(false);
      setCurrentChain(getChainName({ hex: chainHex }));
    } catch (switchError: unknown) {
      // This error code indicates that the chain has not been added to MetaMask
      if (
        switchError &&
        typeof switchError === 'object' &&
        'code' in switchError &&
        switchError.code === 4902
      ) {
        try {
          await windowEthereum.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainHex,
                chainName: 'Base Mainnet',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: [rpcUrl],
                blockExplorerUrls: ['https://basescan.org'],
              },
            ],
          });

          // Update status after adding network
          setIsWrongNetwork(false);
          setCurrentChain('Base');
        } catch (addError) {
          notifyError('Failed to add the Base network to your wallet.');
        }
      } else {
        notifyError('Failed to switch to networks.');
      }
    }
  };

  return {
    currentChain,
    isWrongNetwork,
    promptNetworkSwitch,
  };
}
