/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';

export declare const UpdateCommentResponseCommentVersionHistoriesItem: core.serialization.ObjectSchema<
  serializers.UpdateCommentResponseCommentVersionHistoriesItem.Raw,
  CommonApi.UpdateCommentResponseCommentVersionHistoriesItem
>;
export declare namespace UpdateCommentResponseCommentVersionHistoriesItem {
  interface Raw {
    id?: number | null;
    comment_id: number;
    text: string;
    timestamp: string;
    content_url?: string | null;
  }
}
