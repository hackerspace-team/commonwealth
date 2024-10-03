/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as CommonApi from "../../../../api/index";
import * as core from "../../../../core";
export declare const DeleteTopicResponse: core.serialization.ObjectSchema<serializers.DeleteTopicResponse.Raw, CommonApi.DeleteTopicResponse>;
export declare namespace DeleteTopicResponse {
    interface Raw {
        community_id: string;
        topic_id: number;
    }
}
