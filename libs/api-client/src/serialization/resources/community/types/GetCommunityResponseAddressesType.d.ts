/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as CommonApi from "../../../../api/index";
import * as core from "../../../../core";
export declare const GetCommunityResponseAddressesType: core.serialization.Schema<serializers.GetCommunityResponseAddressesType.Raw, CommonApi.GetCommunityResponseAddressesType>;
export declare namespace GetCommunityResponseAddressesType {
    type Raw = "chain" | "dao" | "token" | "offchain";
}
