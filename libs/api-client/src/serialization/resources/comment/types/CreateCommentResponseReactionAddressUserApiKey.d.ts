/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
export declare const CreateCommentResponseReactionAddressUserApiKey: core.serialization.ObjectSchema<
  serializers.CreateCommentResponseReactionAddressUserApiKey.Raw,
  CommonApi.CreateCommentResponseReactionAddressUserApiKey
>;
export declare namespace CreateCommentResponseReactionAddressUserApiKey {
  interface Raw {
    user_id?: number | null;
    hashed_api_key: string;
    salt: string;
    created_at?: string | null;
    updated_at?: string | null;
  }
}
