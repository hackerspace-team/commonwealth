/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../../api/index';
import * as core from '../../../../../core';
import * as serializers from '../../../../index';
export declare const DeleteCommentRequest: core.serialization.Schema<
  serializers.DeleteCommentRequest.Raw,
  CommonApi.DeleteCommentRequest
>;
export declare namespace DeleteCommentRequest {
  interface Raw {
    comment_id: number;
  }
}
