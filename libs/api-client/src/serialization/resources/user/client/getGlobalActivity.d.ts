/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { GetGlobalActivityResponseItem } from '../types/GetGlobalActivityResponseItem';
export declare const Response: core.serialization.Schema<
  serializers.user.getGlobalActivity.Response.Raw,
  CommonApi.GetGlobalActivityResponseItem[]
>;
export declare namespace Response {
  type Raw = GetGlobalActivityResponseItem.Raw[];
}
