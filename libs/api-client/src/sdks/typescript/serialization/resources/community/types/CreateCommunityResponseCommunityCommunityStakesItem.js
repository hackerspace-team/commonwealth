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
exports.CreateCommunityResponseCommunityCommunityStakesItem = void 0;
const core = __importStar(require('../../../../core'));
const CreateCommunityResponseCommunityCommunityStakesItemStakeTransactionsItem_1 = require('./CreateCommunityResponseCommunityCommunityStakesItemStakeTransactionsItem');
exports.CreateCommunityResponseCommunityCommunityStakesItem =
  core.serialization.object({
    id: core.serialization.number().optional(),
    communityId: core.serialization.property(
      'community_id',
      core.serialization.string(),
    ),
    stakeId: core.serialization.property(
      'stake_id',
      core.serialization.number().optional(),
    ),
    stakeToken: core.serialization.property(
      'stake_token',
      core.serialization.string().optional(),
    ),
    voteWeight: core.serialization.property(
      'vote_weight',
      core.serialization.number().optional(),
    ),
    stakeEnabled: core.serialization.property(
      'stake_enabled',
      core.serialization.boolean().optional(),
    ),
    stakeTransactions: core.serialization.property(
      'StakeTransactions',
      core.serialization
        .list(
          CreateCommunityResponseCommunityCommunityStakesItemStakeTransactionsItem_1.CreateCommunityResponseCommunityCommunityStakesItemStakeTransactionsItem,
        )
        .optional(),
    ),
    createdAt: core.serialization.property(
      'created_at',
      core.serialization.date().optional(),
    ),
    updatedAt: core.serialization.property(
      'updated_at',
      core.serialization.date().optional(),
    ),
  });
