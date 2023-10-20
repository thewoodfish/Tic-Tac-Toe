"use strict";
// Copyright (c) 2023 Algorealm, Inc.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDidExistence = exports.manageAccess = exports.createID = void 0;
var util_1 = require("@polkadot/util");
var MAX_CALL_WEIGHT = new util_1.BN(5000000000000).isub(util_1.BN_ONE);
var PROOFSIZE = new util_1.BN(1000000);
var storageDepositLimit = new util_1.BN(1000);
function createID(api, contract, account, did, ht_cid, signature) {
    return __awaiter(this, void 0, void 0, function () {
        var maxGas, maxProof, gl;
        var _this = this;
        return __generator(this, function (_a) {
            maxGas = 4793859072;
            maxProof = 125952;
            gl = api.registry.createType('WeightV2', {
                refTime: maxGas,
                proofSize: maxProof,
            });
            // Wrap the entire logic in a Promise
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, gasRequired, storageDeposit, result, error, dispatchError, flags, type, typeName, error, unsub_1, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 3, , 4]);
                                return [4 /*yield*/, contract.query.newAccount(account.address, {
                                        gasLimit: gl,
                                    }, did, ht_cid, signature)
                                    // Check for errors
                                ];
                            case 1:
                                _a = _b.sent(), gasRequired = _a.gasRequired, storageDeposit = _a.storageDeposit, result = _a.result;
                                // Check for errors
                                if (result.isErr) {
                                    error = '';
                                    if (result.asErr.isModule) {
                                        dispatchError = api.registry.findMetaError(result.asErr.asModule);
                                        error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name;
                                    }
                                    else {
                                        error = result.asErr.toString();
                                    }
                                    console.error(error);
                                    reject(error); // Reject with the error message
                                }
                                // Even if the result is Ok, it could be a revert in the contract execution
                                if (result.isOk) {
                                    flags = result.asOk.flags.toHuman();
                                    // Check if the result is a revert via flags
                                    if (flags.includes('Revert')) {
                                        type = contract.abi.messages[5].returnType;
                                        typeName = (type === null || type === void 0 ? void 0 : type.lookupName) || (type === null || type === void 0 ? void 0 : type.type) || '';
                                        error = contract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman();
                                        console.error(error ? error.Err : 'Revert');
                                        reject(error || 'Revert'); // Reject with the error message
                                    }
                                }
                                return [4 /*yield*/, contract.tx
                                        .newAccount({
                                        gasLimit: gl,
                                    }, did, ht_cid, signature)
                                        .signAndSend(account, function (res) {
                                        if (res.status.isInBlock) {
                                            console.log('in a block');
                                        }
                                        if (res.status.isFinalized) {
                                            console.log('Successfully sent the txn');
                                            unsub_1();
                                            resolve('Successfully sent the txn'); // Resolve when the transaction is finalized
                                        }
                                    })];
                            case 2:
                                unsub_1 = _b.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                error_1 = _b.sent();
                                console.error(error_1);
                                reject(error_1); // Reject if there's an exception
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.createID = createID;
function manageAccess(api, contract, account, appDid, userDid, allow) {
    return __awaiter(this, void 0, void 0, function () {
        var maxGas, maxProof, gl;
        var _this = this;
        return __generator(this, function (_a) {
            maxGas = 4793859072;
            maxProof = 125952;
            gl = api.registry.createType('WeightV2', {
                refTime: maxGas,
                proofSize: maxProof,
            });
            // restrict application access to a users data
            if (!allow) {
                // Wrap the entire logic in a Promise
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, gasRequired, storageDeposit, result, error, dispatchError, flags, type, typeName, error, unsub_2, error_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, contract.query.restrict(account.address, {
                                            gasLimit: gl,
                                        }, userDid, appDid)
                                        // Check for errors
                                    ];
                                case 1:
                                    _a = _b.sent(), gasRequired = _a.gasRequired, storageDeposit = _a.storageDeposit, result = _a.result;
                                    // Check for errors
                                    if (result.isErr) {
                                        error = '';
                                        if (result.asErr.isModule) {
                                            dispatchError = api.registry.findMetaError(result.asErr.asModule);
                                            error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name;
                                        }
                                        else {
                                            error = result.asErr.toString();
                                        }
                                        console.error(error);
                                        reject(error); // Reject with the error message
                                    }
                                    // Even if the result is Ok, it could be a revert in the contract execution
                                    if (result.isOk) {
                                        flags = result.asOk.flags.toHuman();
                                        // Check if the result is a revert via flags
                                        if (flags.includes('Revert')) {
                                            type = contract.abi.messages[5].returnType;
                                            typeName = (type === null || type === void 0 ? void 0 : type.lookupName) || (type === null || type === void 0 ? void 0 : type.type) || '';
                                            error = contract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman();
                                            console.error(error ? error.Err : 'Revert');
                                            reject(error || 'Revert'); // Reject with the error message
                                        }
                                    }
                                    return [4 /*yield*/, contract.tx
                                            .restrict({
                                            gasLimit: gl,
                                        }, userDid, appDid)
                                            .signAndSend(account, function (res) {
                                            if (res.status.isInBlock) {
                                                console.log('in a block');
                                            }
                                            if (res.status.isFinalized) {
                                                console.log('Successfully sent the txn');
                                                unsub_2();
                                                resolve('Successfully sent the txn'); // Resolve when the transaction is finalized
                                            }
                                        })];
                                case 2:
                                    unsub_2 = _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_2 = _b.sent();
                                    console.error(error_2);
                                    reject(error_2); // Reject if there's an exception
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            }
            else {
                // Wrap the entire logic in a Promise
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, gasRequired, storageDeposit, result, error, dispatchError, flags, type, typeName, error, unsub_3, error_3;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, contract.query.unrestrict(account.address, {
                                            gasLimit: gl,
                                        }, userDid, appDid)
                                        // Check for errors
                                    ];
                                case 1:
                                    _a = _b.sent(), gasRequired = _a.gasRequired, storageDeposit = _a.storageDeposit, result = _a.result;
                                    // Check for errors
                                    if (result.isErr) {
                                        error = '';
                                        if (result.asErr.isModule) {
                                            dispatchError = api.registry.findMetaError(result.asErr.asModule);
                                            error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name;
                                        }
                                        else {
                                            error = result.asErr.toString();
                                        }
                                        console.error(error);
                                        reject(error); // Reject with the error message
                                    }
                                    // Even if the result is Ok, it could be a revert in the contract execution
                                    if (result.isOk) {
                                        flags = result.asOk.flags.toHuman();
                                        // Check if the result is a revert via flags
                                        if (flags.includes('Revert')) {
                                            type = contract.abi.messages[5].returnType;
                                            typeName = (type === null || type === void 0 ? void 0 : type.lookupName) || (type === null || type === void 0 ? void 0 : type.type) || '';
                                            error = contract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman();
                                            console.error(error ? error.Err : 'Revert');
                                            reject(error || 'Revert'); // Reject with the error message
                                        }
                                    }
                                    return [4 /*yield*/, contract.tx
                                            .unrestrict({
                                            gasLimit: gl,
                                        }, userDid, appDid)
                                            .signAndSend(account, function (res) {
                                            if (res.status.isInBlock) {
                                                console.log('in a block');
                                            }
                                            if (res.status.isFinalized) {
                                                console.log('Successfully sent the txn');
                                                unsub_3();
                                                resolve('Successfully sent the txn'); // Resolve when the transaction is finalized
                                            }
                                        })];
                                case 2:
                                    unsub_3 = _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_3 = _b.sent();
                                    console.error(error_3);
                                    reject(error_3); // Reject if there's an exception
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            }
            return [2 /*return*/];
        });
    });
}
exports.manageAccess = manageAccess;
function checkDidExistence(api, contract, account, did) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result, output;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, contract.query.checkDidExistence(account.address, {
                        gasLimit: api === null || api === void 0 ? void 0 : api.registry.createType('WeightV2', {
                            refTime: MAX_CALL_WEIGHT,
                            proofSize: PROOFSIZE,
                        }),
                        storageDepositLimit: storageDepositLimit,
                    }, did)];
                case 1:
                    _a = _b.sent(), result = _a.result, output = _a.output;
                    return [2 /*return*/, result.toHuman()];
            }
        });
    });
}
exports.checkDidExistence = checkDidExistence;
