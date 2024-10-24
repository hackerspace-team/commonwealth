/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { UpdateThreadResponseReactionsItemAddressRole } from './UpdateThreadResponseReactionsItemAddressRole';
import { UpdateThreadResponseReactionsItemAddressUser } from './UpdateThreadResponseReactionsItemAddressUser';
import { UpdateThreadResponseReactionsItemAddressWalletId } from './UpdateThreadResponseReactionsItemAddressWalletId';
export declare const UpdateThreadResponseReactionsItemAddress: core.serialization.ObjectSchema<
  serializers.UpdateThreadResponseReactionsItemAddress.Raw,
  CommonApi.UpdateThreadResponseReactionsItemAddress
>;
export declare namespace UpdateThreadResponseReactionsItemAddress {
  interface Raw {
    id?: number | null;
    address: string;
    community_id: string;
    user_id?: number | null;
    verification_token?: string | null;
    verification_token_expires?: string | null;
    verified?: string | null;
    last_active?: string | null;
    ghost_address?: boolean | null;
    wallet_id?: UpdateThreadResponseReactionsItemAddressWalletId.Raw | null;
    block_info?: string | null;
    is_user_default?: boolean | null;
    role?: UpdateThreadResponseReactionsItemAddressRole.Raw | null;
    is_banned?: boolean | null;
    hex?: string | null;
    User?: UpdateThreadResponseReactionsItemAddressUser.Raw | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
}
