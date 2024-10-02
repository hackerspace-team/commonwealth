/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as CommonApi from "../../../../api/index";
import * as core from "../../../../core";
import { UpdateCommunityResponseChainNodeBalanceType } from "./UpdateCommunityResponseChainNodeBalanceType";
import { UpdateCommunityResponseChainNodeCosmosGovVersion } from "./UpdateCommunityResponseChainNodeCosmosGovVersion";
import { UpdateCommunityResponseChainNodeHealth } from "./UpdateCommunityResponseChainNodeHealth";
import { UpdateCommunityResponseChainNodeContractsItem } from "./UpdateCommunityResponseChainNodeContractsItem";
export declare const UpdateCommunityResponseChainNode: core.serialization.ObjectSchema<serializers.UpdateCommunityResponseChainNode.Raw, CommonApi.UpdateCommunityResponseChainNode>;
export declare namespace UpdateCommunityResponseChainNode {
    interface Raw {
        id?: number | null;
        url?: string | null;
        eth_chain_id?: number | null;
        alt_wallet_url?: string | null;
        private_url?: string | null;
        balance_type?: UpdateCommunityResponseChainNodeBalanceType.Raw | null;
        name?: string | null;
        description?: string | null;
        ss58?: number | null;
        bech32?: string | null;
        slip44?: number | null;
        cosmos_chain_id?: string | null;
        cosmos_gov_version?: UpdateCommunityResponseChainNodeCosmosGovVersion.Raw | null;
        health?: UpdateCommunityResponseChainNodeHealth.Raw | null;
        contracts?: UpdateCommunityResponseChainNodeContractsItem.Raw[] | null;
        block_explorer?: string | null;
        max_ce_block_range?: number | null;
        created_at?: string | null;
        updated_at?: string | null;
    }
}
