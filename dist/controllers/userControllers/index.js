"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserAllController = exports.getUserDetailController = void 0;
const findOneUserByIdService_1 = __importDefault(require("../../services/userServices/findOneUserByIdService"));
const AppError_1 = require("../../helpers/errors/AppError");
const extractModelProperties_1 = __importDefault(require("../../helpers/extractModelProperties"));
const models_1 = require("./models");
const findAllUserService_1 = __importDefault(require("../../services/userServices/findAllUserService"));
const deleteUserByIdService_1 = __importDefault(require("../../services/userServices/deleteUserByIdService"));
const validation_1 = require("../../models/User/validation");
const updateUserService_1 = __importDefault(require("../../services/userServices/updateUserService"));
const findOneUserByEmailService_1 = __importDefault(require("../../services/userServices/findOneUserByEmailService"));
const createUserService_1 = __importDefault(require("../../services/userServices/createUserService"));
const getUserDetailController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const user = yield (0, findOneUserByIdService_1.default)(id);
        if (!user) {
            throw new AppError_1.AppError("User not found", 404);
        }
        res.status(200).json((0, extractModelProperties_1.default)(user, models_1.userModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.getUserDetailController = getUserDetailController;
const getUserAllController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, findAllUserService_1.default)();
        res.status(200).json((0, extractModelProperties_1.default)(users, models_1.userModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.getUserAllController = getUserAllController;
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFields = req.body;
    try {
        const { error } = (0, validation_1.validateCreateUserSchema)(userFields);
        if (error) {
            throw new AppError_1.AppError(error.message);
        }
        const userExist = yield (0, findOneUserByEmailService_1.default)(userFields.email);
        if (userExist) {
            throw new AppError_1.AppError("User already exists");
        }
        const userCreated = yield (0, createUserService_1.default)(userFields);
        res
            .status(201)
            .json((0, extractModelProperties_1.default)(userCreated, models_1.userModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.createUserController = createUserController;
const updateUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFields = req.body;
    const { id } = req.params;
    try {
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const { error } = (0, validation_1.validateUpdateUserSchema)(userFields);
        if (error) {
            throw new AppError_1.AppError(error.message);
        }
        if (userFields.email) {
            const userExist = yield (0, findOneUserByEmailService_1.default)(userFields.email);
            if (userExist) {
                throw new AppError_1.AppError("User already exists");
            }
        }
        const userUpdated = yield (0, updateUserService_1.default)(userFields, id);
        res
            .status(201)
            .json((0, extractModelProperties_1.default)(userUpdated, models_1.userModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const userDeleted = yield (0, deleteUserByIdService_1.default)(id);
        res
            .status(201)
            .json((0, extractModelProperties_1.default)(userDeleted, models_1.userModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUserController = deleteUserController;
