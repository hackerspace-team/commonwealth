import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import React from 'react';
import { CWText } from 'views/components/component_kit/cw_text';
import {
  CWModal,
  CWModalBody,
  CWModalFooter,
  CWModalHeader,
} from 'views/components/component_kit/new_designs/CWModal';
import TokenIcon from '../TokenIcon';
import { TradeTokenModalProps } from '../types';
import './UniswapTradeModal.scss';
import useUniswapTradeModal from './useUniswapTradeModal';

const UniswapTradeModal = ({
  isOpen,
  onModalClose,
  tradeConfig,
}: TradeTokenModalProps) => {
  const { uniswapWidget } = useUniswapTradeModal({ tradeConfig });

  return (
    <CWModal
      open={isOpen}
      onClose={() => onModalClose?.()}
      size="medium"
      className="UniswapTradeModal"
      content={
        <>
          <CWModalHeader
            label={
              <CWText type="h4" className="token-info">
                Swap Token - {tradeConfig.token.symbol}{' '}
                {tradeConfig.token.icon_url && (
                  <TokenIcon size="large" url={tradeConfig.token.icon_url} />
                )}
              </CWText>
            }
            onModalClose={() => onModalClose?.()}
          />
          <CWModalBody>
            <div className="Uniswap">
              <SwapWidget
                className="uniswap-widget-wrapper"
                tokenList={uniswapWidget.tokenListURLs.default}
                routerUrl={uniswapWidget.routerURLs.default}
                theme={uniswapWidget.theme}
                defaultInputTokenAddress="NATIVE"
                defaultOutputTokenAddress={tradeConfig.token.token_address}
                hideConnectionUI={true}
                {...(uniswapWidget.provider && {
                  provider: uniswapWidget.provider,
                })}
              />
            </div>
          </CWModalBody>
          <CWModalFooter>
            <></>
          </CWModalFooter>
        </>
      }
    />
  );
};

export default UniswapTradeModal;
