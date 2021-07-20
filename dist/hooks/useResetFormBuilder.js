"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useResetFB = function () {
    var _a = react_1.useState(0), resetToken = _a[0], setResetToken = _a[1];
    var handleReset = function () {
        setResetToken(Math.random);
    };
    return { handleReset: handleReset, resetToken: resetToken };
};
exports.default = useResetFB;
