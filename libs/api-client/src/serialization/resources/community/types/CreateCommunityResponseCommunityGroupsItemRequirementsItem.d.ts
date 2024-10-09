/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { CreateCommunityResponseCommunityGroupsItemRequirementsItemAllow } from './CreateCommunityResponseCommunityGroupsItemRequirementsItemAllow';
import { CreateCommunityResponseCommunityGroupsItemRequirementsItemThreshold } from './CreateCommunityResponseCommunityGroupsItemRequirementsItemThreshold';

export declare const CreateCommunityResponseCommunityGroupsItemRequirementsItem: core.serialization.Schema<
  serializers.CreateCommunityResponseCommunityGroupsItemRequirementsItem.Raw,
  CommonApi.CreateCommunityResponseCommunityGroupsItemRequirementsItem
>;
export declare namespace CreateCommunityResponseCommunityGroupsItemRequirementsItem {
  type Raw =
    | CreateCommunityResponseCommunityGroupsItemRequirementsItem.Threshold
    | CreateCommunityResponseCommunityGroupsItemRequirementsItem.Allow;

  interface Threshold
    extends CreateCommunityResponseCommunityGroupsItemRequirementsItemThreshold.Raw {
    rule: 'threshold';
  }

  interface Allow
    extends CreateCommunityResponseCommunityGroupsItemRequirementsItemAllow.Raw {
    rule: 'allow';
  }
}
