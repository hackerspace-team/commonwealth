/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as CommonApi from "../../../../api/index";
import * as core from "../../../../core";
import { UpdateThreadResponseCollaboratorsItemUserEmailNotificationInterval } from "./UpdateThreadResponseCollaboratorsItemUserEmailNotificationInterval";
import { UpdateThreadResponseCollaboratorsItemUserProfile } from "./UpdateThreadResponseCollaboratorsItemUserProfile";
import { UpdateThreadResponseCollaboratorsItemUserProfileTagsItem } from "./UpdateThreadResponseCollaboratorsItemUserProfileTagsItem";
export declare const UpdateThreadResponseCollaboratorsItemUser: core.serialization.ObjectSchema<serializers.UpdateThreadResponseCollaboratorsItemUser.Raw, CommonApi.UpdateThreadResponseCollaboratorsItemUser>;
export declare namespace UpdateThreadResponseCollaboratorsItemUser {
    interface Raw {
        id?: number | null;
        email?: string | null;
        isAdmin?: boolean | null;
        disableRichText?: boolean | null;
        emailVerified?: boolean | null;
        selected_community_id?: string | null;
        emailNotificationInterval?: UpdateThreadResponseCollaboratorsItemUserEmailNotificationInterval.Raw | null;
        promotional_emails_enabled?: boolean | null;
        is_welcome_onboard_flow_complete?: boolean | null;
        profile: UpdateThreadResponseCollaboratorsItemUserProfile.Raw;
        ProfileTags?: UpdateThreadResponseCollaboratorsItemUserProfileTagsItem.Raw[] | null;
        created_at?: string | null;
        updated_at?: string | null;
    }
}
