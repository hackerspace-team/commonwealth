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
exports.CreateGroupResponseContestManagersItemContestsItemActionsItem = void 0;
const core = __importStar(require('../../../../core'));
const CreateGroupResponseContestManagersItemContestsItemActionsItemAction_1 = require('./CreateGroupResponseContestManagersItemContestsItemActionsItemAction');
exports.CreateGroupResponseContestManagersItemContestsItemActionsItem =
  core.serialization.object({
    contestAddress: core.serialization.property(
      'contest_address',
      core.serialization.string(),
    ),
    contestId: core.serialization.property(
      'contest_id',
      core.serialization.number(),
    ),
    contentId: core.serialization.property(
      'content_id',
      core.serialization.number(),
    ),
    actorAddress: core.serialization.property(
      'actor_address',
      core.serialization.string(),
    ),
    action:
      CreateGroupResponseContestManagersItemContestsItemActionsItemAction_1.CreateGroupResponseContestManagersItemContestsItemActionsItemAction,
    contentUrl: core.serialization.property(
      'content_url',
      core.serialization.string().optional(),
    ),
    threadId: core.serialization.property(
      'thread_id',
      core.serialization.number().optional(),
    ),
    threadTitle: core.serialization.property(
      'thread_title',
      core.serialization.string().optional(),
    ),
    votingPower: core.serialization.property(
      'voting_power',
      core.serialization.number(),
    ),
    createdAt: core.serialization.property(
      'created_at',
      core.serialization.date(),
    ),
  });
