/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
export declare const CreateGroupResponseGroupsItemRequirementsItemAllowData: core.serialization.ObjectSchema<
  serializers.CreateGroupResponseGroupsItemRequirementsItemAllowData.Raw,
  CommonApi.CreateGroupResponseGroupsItemRequirementsItemAllowData
>;
export declare namespace CreateGroupResponseGroupsItemRequirementsItemAllowData {
  interface Raw {
    allow: string[];
  }
}
