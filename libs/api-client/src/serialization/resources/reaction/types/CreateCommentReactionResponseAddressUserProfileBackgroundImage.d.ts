/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as CommonApi from "../../../../api/index";
import * as core from "../../../../core";
export declare const CreateCommentReactionResponseAddressUserProfileBackgroundImage: core.serialization.ObjectSchema<serializers.CreateCommentReactionResponseAddressUserProfileBackgroundImage.Raw, CommonApi.CreateCommentReactionResponseAddressUserProfileBackgroundImage>;
export declare namespace CreateCommentReactionResponseAddressUserProfileBackgroundImage {
    interface Raw {
        url?: string | null;
        imageBehavior?: string | null;
    }
}
