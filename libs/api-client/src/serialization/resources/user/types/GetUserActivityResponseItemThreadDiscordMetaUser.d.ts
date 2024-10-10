/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
export declare const GetUserActivityResponseItemThreadDiscordMetaUser: core.serialization.ObjectSchema<
  serializers.GetUserActivityResponseItemThreadDiscordMetaUser.Raw,
  CommonApi.GetUserActivityResponseItemThreadDiscordMetaUser
>;
export declare namespace GetUserActivityResponseItemThreadDiscordMetaUser {
  interface Raw {
    id: string;
    username: string;
  }
}
