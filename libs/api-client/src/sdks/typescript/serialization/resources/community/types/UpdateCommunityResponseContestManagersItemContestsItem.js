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
exports.UpdateCommunityResponseContestManagersItemContestsItem = void 0;
const core = __importStar(require('../../../../core'));
const UpdateCommunityResponseContestManagersItemContestsItemScoreItem_1 = require('./UpdateCommunityResponseContestManagersItemContestsItemScoreItem');
const UpdateCommunityResponseContestManagersItemContestsItemActionsItem_1 = require('./UpdateCommunityResponseContestManagersItemContestsItemActionsItem');
exports.UpdateCommunityResponseContestManagersItemContestsItem =
  core.serialization.object({
    contestAddress: core.serialization.property(
      'contest_address',
      core.serialization.string(),
    ),
    contestId: core.serialization.property(
      'contest_id',
      core.serialization.number(),
    ),
    startTime: core.serialization.property(
      'start_time',
      core.serialization.date(),
    ),
    endTime: core.serialization.property('end_time', core.serialization.date()),
    scoreUpdatedAt: core.serialization.property(
      'score_updated_at',
      core.serialization.date().optional(),
    ),
    score: core.serialization
      .list(
        UpdateCommunityResponseContestManagersItemContestsItemScoreItem_1.UpdateCommunityResponseContestManagersItemContestsItemScoreItem,
      )
      .optional(),
    actions: core.serialization
      .list(
        UpdateCommunityResponseContestManagersItemContestsItemActionsItem_1.UpdateCommunityResponseContestManagersItemContestsItemActionsItem,
      )
      .optional(),
  });
