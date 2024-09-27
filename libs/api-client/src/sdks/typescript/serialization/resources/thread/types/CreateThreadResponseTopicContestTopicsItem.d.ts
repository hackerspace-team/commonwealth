/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as CommonApi from "../../../../api/index";
import * as core from "../../../../core";
export declare const CreateThreadResponseTopicContestTopicsItem: core.serialization.ObjectSchema<serializers.CreateThreadResponseTopicContestTopicsItem.Raw, CommonApi.CreateThreadResponseTopicContestTopicsItem>;
export declare namespace CreateThreadResponseTopicContestTopicsItem {
    interface Raw {
        contest_address: string;
        topic_id: number;
        created_at: string;
    }
}
