/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as CommonApi from "../../../../api/index";
import * as core from "../../../../core";
import { GetCommunityResponseAddressesGroupsItemRequirementsItemThreshold } from "./GetCommunityResponseAddressesGroupsItemRequirementsItemThreshold";
import { GetCommunityResponseAddressesGroupsItemRequirementsItemAllow } from "./GetCommunityResponseAddressesGroupsItemRequirementsItemAllow";
export declare const GetCommunityResponseAddressesGroupsItemRequirementsItem: core.serialization.Schema<serializers.GetCommunityResponseAddressesGroupsItemRequirementsItem.Raw, CommonApi.GetCommunityResponseAddressesGroupsItemRequirementsItem>;
export declare namespace GetCommunityResponseAddressesGroupsItemRequirementsItem {
    type Raw = GetCommunityResponseAddressesGroupsItemRequirementsItem.Threshold | GetCommunityResponseAddressesGroupsItemRequirementsItem.Allow;
    interface Threshold extends GetCommunityResponseAddressesGroupsItemRequirementsItemThreshold.Raw {
        rule: "threshold";
    }
    interface Allow extends GetCommunityResponseAddressesGroupsItemRequirementsItemAllow.Raw {
        rule: "allow";
    }
}
