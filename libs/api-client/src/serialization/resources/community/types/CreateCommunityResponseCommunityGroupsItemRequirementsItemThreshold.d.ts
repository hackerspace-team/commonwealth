/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdData } from './CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdData';

export declare const CreateCommunityResponseCommunityGroupsItemRequirementsItemThreshold: core.serialization.ObjectSchema<
  serializers.CreateCommunityResponseCommunityGroupsItemRequirementsItemThreshold.Raw,
  CommonApi.CreateCommunityResponseCommunityGroupsItemRequirementsItemThreshold
>;
export declare namespace CreateCommunityResponseCommunityGroupsItemRequirementsItemThreshold {
  interface Raw {
    data: CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdData.Raw;
  }
}
