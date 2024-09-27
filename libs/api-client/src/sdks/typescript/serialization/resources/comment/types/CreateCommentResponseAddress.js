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
exports.CreateCommentResponseAddress = void 0;
const core = __importStar(require('../../../../core'));
const CreateCommentResponseAddressWalletId_1 = require('./CreateCommentResponseAddressWalletId');
const CreateCommentResponseAddressRole_1 = require('./CreateCommentResponseAddressRole');
const CreateCommentResponseAddressUser_1 = require('./CreateCommentResponseAddressUser');
exports.CreateCommentResponseAddress = core.serialization.object({
  id: core.serialization.number().optional(),
  address: core.serialization.string(),
  communityId: core.serialization.property(
    'community_id',
    core.serialization.string(),
  ),
  userId: core.serialization.property(
    'user_id',
    core.serialization.number().optional(),
  ),
  verificationToken: core.serialization.property(
    'verification_token',
    core.serialization.string().optional(),
  ),
  verificationTokenExpires: core.serialization.property(
    'verification_token_expires',
    core.serialization.date().optional(),
  ),
  verified: core.serialization.date().optional(),
  lastActive: core.serialization.property(
    'last_active',
    core.serialization.date().optional(),
  ),
  ghostAddress: core.serialization.property(
    'ghost_address',
    core.serialization.boolean().optional(),
  ),
  walletId: core.serialization.property(
    'wallet_id',
    CreateCommentResponseAddressWalletId_1.CreateCommentResponseAddressWalletId.optional(),
  ),
  blockInfo: core.serialization.property(
    'block_info',
    core.serialization.string().optional(),
  ),
  isUserDefault: core.serialization.property(
    'is_user_default',
    core.serialization.boolean().optional(),
  ),
  role: CreateCommentResponseAddressRole_1.CreateCommentResponseAddressRole.optional(),
  isBanned: core.serialization.property(
    'is_banned',
    core.serialization.boolean().optional(),
  ),
  hex: core.serialization.string().optional(),
  user: core.serialization.property(
    'User',
    CreateCommentResponseAddressUser_1.CreateCommentResponseAddressUser.optional(),
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
