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
exports.CreateThreadResponseReactionsItemAddressUserProfile = void 0;
const core = __importStar(require('../../../../core'));
const CreateThreadResponseReactionsItemAddressUserProfileBackgroundImage_1 = require('./CreateThreadResponseReactionsItemAddressUserProfileBackgroundImage');
exports.CreateThreadResponseReactionsItemAddressUserProfile =
  core.serialization.object({
    name: core.serialization.string().optional(),
    email: core.serialization.string().optional(),
    website: core.serialization.string().optional(),
    bio: core.serialization.string().optional(),
    avatarUrl: core.serialization.property(
      'avatar_url',
      core.serialization.string().optional(),
    ),
    slug: core.serialization.string().optional(),
    socials: core.serialization.list(core.serialization.string()).optional(),
    backgroundImage: core.serialization.property(
      'background_image',
      CreateThreadResponseReactionsItemAddressUserProfileBackgroundImage_1.CreateThreadResponseReactionsItemAddressUserProfileBackgroundImage.optional(),
    ),
  });
