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
exports.UpdateCommunityRequestTopicsItem = void 0;
const core = __importStar(require('../../../../core'));
const UpdateCommunityRequestTopicsItemWeightedVoting_1 = require('./UpdateCommunityRequestTopicsItemWeightedVoting');
const UpdateCommunityRequestTopicsItemContestTopicsItem_1 = require('./UpdateCommunityRequestTopicsItemContestTopicsItem');
exports.UpdateCommunityRequestTopicsItem = core.serialization.object({
  id: core.serialization.number().optional(),
  name: core.serialization.string().optional(),
  communityId: core.serialization.property(
    'community_id',
    core.serialization.string(),
  ),
  description: core.serialization.string().optional(),
  telegram: core.serialization.string().optional(),
  featuredInSidebar: core.serialization.property(
    'featured_in_sidebar',
    core.serialization.boolean().optional(),
  ),
  featuredInNewPost: core.serialization.property(
    'featured_in_new_post',
    core.serialization.boolean().optional(),
  ),
  defaultOffchainTemplate: core.serialization.property(
    'default_offchain_template',
    core.serialization.string().optional(),
  ),
  order: core.serialization.number().optional(),
  channelId: core.serialization.property(
    'channel_id',
    core.serialization.string().optional(),
  ),
  groupIds: core.serialization.property(
    'group_ids',
    core.serialization.list(core.serialization.number()).optional(),
  ),
  defaultOffchainTemplateBackup: core.serialization.property(
    'default_offchain_template_backup',
    core.serialization.string().optional(),
  ),
  weightedVoting: core.serialization.property(
    'weighted_voting',
    UpdateCommunityRequestTopicsItemWeightedVoting_1.UpdateCommunityRequestTopicsItemWeightedVoting.optional(),
  ),
  chainNodeId: core.serialization.property(
    'chain_node_id',
    core.serialization.number().optional(),
  ),
  tokenAddress: core.serialization.property(
    'token_address',
    core.serialization.string().optional(),
  ),
  tokenSymbol: core.serialization.property(
    'token_symbol',
    core.serialization.string().optional(),
  ),
  voteWeightMultiplier: core.serialization.property(
    'vote_weight_multiplier',
    core.serialization.number().optional(),
  ),
  createdAt: core.serialization.property(
    'created_at',
    core.serialization.date().optional(),
  ),
  updatedAt: core.serialization.property(
    'updated_at',
    core.serialization.date().optional(),
  ),
  deletedAt: core.serialization.property(
    'deleted_at',
    core.serialization.date().optional(),
  ),
  contestTopics: core.serialization.property(
    'contest_topics',
    core.serialization
      .list(
        UpdateCommunityRequestTopicsItemContestTopicsItem_1.UpdateCommunityRequestTopicsItemContestTopicsItem,
      )
      .optional(),
  ),
});
