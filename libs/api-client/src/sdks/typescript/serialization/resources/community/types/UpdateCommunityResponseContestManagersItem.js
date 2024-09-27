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
exports.UpdateCommunityResponseContestManagersItem = void 0;
const core = __importStar(require('../../../../core'));
const UpdateCommunityResponseContestManagersItemTopicsItem_1 = require('./UpdateCommunityResponseContestManagersItemTopicsItem');
const UpdateCommunityResponseContestManagersItemContestsItem_1 = require('./UpdateCommunityResponseContestManagersItemContestsItem');
exports.UpdateCommunityResponseContestManagersItem = core.serialization.object({
  contestAddress: core.serialization.property(
    'contest_address',
    core.serialization.string(),
  ),
  communityId: core.serialization.property(
    'community_id',
    core.serialization.string(),
  ),
  name: core.serialization.string(),
  imageUrl: core.serialization.property(
    'image_url',
    core.serialization.string().optional(),
  ),
  fundingTokenAddress: core.serialization.property(
    'funding_token_address',
    core.serialization.string().optional(),
  ),
  prizePercentage: core.serialization.property(
    'prize_percentage',
    core.serialization.number().optional(),
  ),
  payoutStructure: core.serialization.property(
    'payout_structure',
    core.serialization.list(core.serialization.number()),
  ),
  interval: core.serialization.number(),
  ticker: core.serialization.string().optional(),
  decimals: core.serialization.number().optional(),
  createdAt: core.serialization.property(
    'created_at',
    core.serialization.date(),
  ),
  cancelled: core.serialization.boolean().optional(),
  ended: core.serialization.boolean().optional(),
  topics: core.serialization
    .list(
      UpdateCommunityResponseContestManagersItemTopicsItem_1.UpdateCommunityResponseContestManagersItemTopicsItem,
    )
    .optional(),
  contests: core.serialization
    .list(
      UpdateCommunityResponseContestManagersItemContestsItem_1.UpdateCommunityResponseContestManagersItemContestsItem,
    )
    .optional(),
});
