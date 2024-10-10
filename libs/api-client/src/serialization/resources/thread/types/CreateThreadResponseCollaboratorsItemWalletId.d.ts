/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
export declare const CreateThreadResponseCollaboratorsItemWalletId: core.serialization.Schema<
  serializers.CreateThreadResponseCollaboratorsItemWalletId.Raw,
  CommonApi.CreateThreadResponseCollaboratorsItemWalletId
>;
export declare namespace CreateThreadResponseCollaboratorsItemWalletId {
  type Raw =
    | 'magic'
    | 'polkadot'
    | 'metamask'
    | 'walletconnect'
    | 'keplr-ethereum'
    | 'keplr'
    | 'leap'
    | 'near'
    | 'terrastation'
    | 'terra-walletconnect'
    | 'cosm-metamask'
    | 'phantom'
    | 'coinbase';
}
