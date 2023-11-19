"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    permissions: {
        type: [{ type: String }],
        default: [],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", userSchema);
