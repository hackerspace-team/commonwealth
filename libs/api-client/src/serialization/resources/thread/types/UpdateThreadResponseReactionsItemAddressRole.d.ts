/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
export declare const UpdateThreadResponseReactionsItemAddressRole: core.serialization.Schema<
  serializers.UpdateThreadResponseReactionsItemAddressRole.Raw,
  CommonApi.UpdateThreadResponseReactionsItemAddressRole
>;
export declare namespace UpdateThreadResponseReactionsItemAddressRole {
  type Raw = 'admin' | 'moderator' | 'member';
}
