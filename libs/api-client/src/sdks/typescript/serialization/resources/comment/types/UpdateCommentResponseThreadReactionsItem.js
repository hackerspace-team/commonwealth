'use strict';
/**
 * This file was auto-generated by Fern from our API Definition.
 */
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UpdateCommentResponseThreadReactionsItem = void 0;
const core = __importStar(require('../../../../core'));
const UpdateCommentResponseThreadReactionsItemAddress_1 = require('./UpdateCommentResponseThreadReactionsItemAddress');
exports.UpdateCommentResponseThreadReactionsItem = core.serialization.object({
  id: core.serialization.number().optional(),
  addressId: core.serialization.property(
    'address_id',
    core.serialization.number(),
  ),
  reaction: core.serialization.stringLiteral('like'),
  threadId: core.serialization.property(
    'thread_id',
    core.serialization.number().optional(),
  ),
  commentId: core.serialization.property(
    'comment_id',
    core.serialization.number().optional(),
  ),
  proposalId: core.serialization.property(
    'proposal_id',
    core.serialization.number().optional(),
  ),
  calculatedVotingWeight: core.serialization.property(
    'calculated_voting_weight',
    core.serialization.number().optional(),
  ),
  canvasSignedData: core.serialization.property(
    'canvas_signed_data',
    core.serialization.unknown().optional(),
  ),
  canvasMsgId: core.serialization.property(
    'canvas_msg_id',
    core.serialization.string().optional(),
  ),
  createdAt: core.serialization.property(
    'created_at',
    core.serialization.date().optional(),
  ),
  updatedAt: core.serialization.property(
    'updated_at',
    core.serialization.date().optional(),
  ),
  address: core.serialization.property(
    'Address',
    UpdateCommentResponseThreadReactionsItemAddress_1.UpdateCommentResponseThreadReactionsItemAddress.optional(),
  ),
});
