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
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Reaction = void 0;
const environments = __importStar(require('../../../../environments'));
const core = __importStar(require('../../../../core'));
const serializers = __importStar(require('../../../../serialization/index'));
const url_join_1 = __importDefault(require('url-join'));
const errors = __importStar(require('../../../../errors/index'));
class Reaction {
  constructor(_options = {}) {
    this._options = _options;
  }
  /**
   * @param {CommonApi.CreateThreadReactionRequest} request
   * @param {Reaction.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @example
   *     await client.reaction.createThreadReaction({
   *         threadId: 1
   *     })
   */
  createThreadReaction(request, requestOptions) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const _response = yield core.fetcher({
        url: (0, url_join_1.default)(
          (_a = yield core.Supplier.get(this._options.environment)) !== null &&
            _a !== void 0
            ? _a
            : environments.CommonApiEnvironment.Default,
          'CreateThreadReaction',
        ),
        method: 'POST',
        headers: Object.assign(
          {
            address:
              (yield core.Supplier.get(this._options.address)) != null
                ? yield core.Supplier.get(this._options.address)
                : undefined,
            'X-Fern-Language': 'JavaScript',
            'X-Fern-Runtime': core.RUNTIME.type,
            'X-Fern-Runtime-Version': core.RUNTIME.version,
          },
          yield this._getCustomAuthorizationHeaders(),
        ),
        contentType: 'application/json',
        requestType: 'json',
        body: Object.assign(
          Object.assign(
            {},
            serializers.CreateThreadReactionRequest.jsonOrThrow(request, {
              unrecognizedObjectKeys: 'strip',
            }),
          ),
          { reaction: 'like' },
        ),
        timeoutMs:
          (requestOptions === null || requestOptions === void 0
            ? void 0
            : requestOptions.timeoutInSeconds) != null
            ? requestOptions.timeoutInSeconds * 1000
            : 60000,
        maxRetries:
          requestOptions === null || requestOptions === void 0
            ? void 0
            : requestOptions.maxRetries,
        abortSignal:
          requestOptions === null || requestOptions === void 0
            ? void 0
            : requestOptions.abortSignal,
      });
      if (_response.ok) {
        return serializers.CreateThreadReactionResponse.parseOrThrow(
          _response.body,
          {
            unrecognizedObjectKeys: 'passthrough',
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            breadcrumbsPrefix: ['response'],
          },
        );
      }
      if (_response.error.reason === 'status-code') {
        throw new errors.CommonApiError({
          statusCode: _response.error.statusCode,
          body: _response.error.body,
        });
      }
      switch (_response.error.reason) {
        case 'non-json':
          throw new errors.CommonApiError({
            statusCode: _response.error.statusCode,
            body: _response.error.rawBody,
          });
        case 'timeout':
          throw new errors.CommonApiTimeoutError();
        case 'unknown':
          throw new errors.CommonApiError({
            message: _response.error.errorMessage,
          });
      }
    });
  }
  /**
   * @param {CommonApi.CreateCommentReactionRequest} request
   * @param {Reaction.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @example
   *     await client.reaction.createCommentReaction({
   *         commentId: 1
   *     })
   */
  createCommentReaction(request, requestOptions) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const _response = yield core.fetcher({
        url: (0, url_join_1.default)(
          (_a = yield core.Supplier.get(this._options.environment)) !== null &&
            _a !== void 0
            ? _a
            : environments.CommonApiEnvironment.Default,
          'CreateCommentReaction',
        ),
        method: 'POST',
        headers: Object.assign(
          {
            address:
              (yield core.Supplier.get(this._options.address)) != null
                ? yield core.Supplier.get(this._options.address)
                : undefined,
            'X-Fern-Language': 'JavaScript',
            'X-Fern-Runtime': core.RUNTIME.type,
            'X-Fern-Runtime-Version': core.RUNTIME.version,
          },
          yield this._getCustomAuthorizationHeaders(),
        ),
        contentType: 'application/json',
        requestType: 'json',
        body: Object.assign(
          Object.assign(
            {},
            serializers.CreateCommentReactionRequest.jsonOrThrow(request, {
              unrecognizedObjectKeys: 'strip',
            }),
          ),
          { reaction: 'like' },
        ),
        timeoutMs:
          (requestOptions === null || requestOptions === void 0
            ? void 0
            : requestOptions.timeoutInSeconds) != null
            ? requestOptions.timeoutInSeconds * 1000
            : 60000,
        maxRetries:
          requestOptions === null || requestOptions === void 0
            ? void 0
            : requestOptions.maxRetries,
        abortSignal:
          requestOptions === null || requestOptions === void 0
            ? void 0
            : requestOptions.abortSignal,
      });
      if (_response.ok) {
        return serializers.CreateCommentReactionResponse.parseOrThrow(
          _response.body,
          {
            unrecognizedObjectKeys: 'passthrough',
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            breadcrumbsPrefix: ['response'],
          },
        );
      }
      if (_response.error.reason === 'status-code') {
        throw new errors.CommonApiError({
          statusCode: _response.error.statusCode,
          body: _response.error.body,
        });
      }
      switch (_response.error.reason) {
        case 'non-json':
          throw new errors.CommonApiError({
            statusCode: _response.error.statusCode,
            body: _response.error.rawBody,
          });
        case 'timeout':
          throw new errors.CommonApiTimeoutError();
        case 'unknown':
          throw new errors.CommonApiError({
            message: _response.error.errorMessage,
          });
      }
    });
  }
  /**
   * @param {CommonApi.DeleteReactionRequest} request
   * @param {Reaction.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @example
   *     await client.reaction.deleteReaction({
   *         communityId: "community_id",
   *         reactionId: 1
   *     })
   */
  deleteReaction(request, requestOptions) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const _response = yield core.fetcher({
        url: (0, url_join_1.default)(
          (_a = yield core.Supplier.get(this._options.environment)) !== null &&
            _a !== void 0
            ? _a
            : environments.CommonApiEnvironment.Default,
          'DeleteReaction',
        ),
        method: 'POST',
        headers: Object.assign(
          {
            address:
              (yield core.Supplier.get(this._options.address)) != null
                ? yield core.Supplier.get(this._options.address)
                : undefined,
            'X-Fern-Language': 'JavaScript',
            'X-Fern-Runtime': core.RUNTIME.type,
            'X-Fern-Runtime-Version': core.RUNTIME.version,
          },
          yield this._getCustomAuthorizationHeaders(),
        ),
        contentType: 'application/json',
        requestType: 'json',
        body: serializers.DeleteReactionRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: 'strip',
        }),
        timeoutMs:
          (requestOptions === null || requestOptions === void 0
            ? void 0
            : requestOptions.timeoutInSeconds) != null
            ? requestOptions.timeoutInSeconds * 1000
            : 60000,
        maxRetries:
          requestOptions === null || requestOptions === void 0
            ? void 0
            : requestOptions.maxRetries,
        abortSignal:
          requestOptions === null || requestOptions === void 0
            ? void 0
            : requestOptions.abortSignal,
      });
      if (_response.ok) {
        return serializers.DeleteReactionResponse.parseOrThrow(_response.body, {
          unrecognizedObjectKeys: 'passthrough',
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          breadcrumbsPrefix: ['response'],
        });
      }
      if (_response.error.reason === 'status-code') {
        throw new errors.CommonApiError({
          statusCode: _response.error.statusCode,
          body: _response.error.body,
        });
      }
      switch (_response.error.reason) {
        case 'non-json':
          throw new errors.CommonApiError({
            statusCode: _response.error.statusCode,
            body: _response.error.rawBody,
          });
        case 'timeout':
          throw new errors.CommonApiTimeoutError();
        case 'unknown':
          throw new errors.CommonApiError({
            message: _response.error.errorMessage,
          });
      }
    });
  }
  _getCustomAuthorizationHeaders() {
    return __awaiter(this, void 0, void 0, function* () {
      const apiKeyValue = yield core.Supplier.get(this._options.apiKey);
      return { 'x-api-key': apiKeyValue };
    });
  }
}
exports.Reaction = Reaction;
