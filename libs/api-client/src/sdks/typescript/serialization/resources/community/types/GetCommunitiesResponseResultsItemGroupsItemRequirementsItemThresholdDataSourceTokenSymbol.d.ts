/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as CommonApi from "../../../../api/index";
import * as core from "../../../../core";
export declare const GetCommunitiesResponseResultsItemGroupsItemRequirementsItemThresholdDataSourceTokenSymbol: core.serialization.ObjectSchema<serializers.GetCommunitiesResponseResultsItemGroupsItemRequirementsItemThresholdDataSourceTokenSymbol.Raw, CommonApi.GetCommunitiesResponseResultsItemGroupsItemRequirementsItemThresholdDataSourceTokenSymbol>;
export declare namespace GetCommunitiesResponseResultsItemGroupsItemRequirementsItemThresholdDataSourceTokenSymbol {
    interface Raw {
        source_type: "cosmos_native";
        cosmos_chain_id: string;
        token_symbol: string;
    }
}
