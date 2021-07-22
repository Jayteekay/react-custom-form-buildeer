"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var types_1 = require("../../types");
var FBInput = function (_a) {
    var error = _a.error, label = _a.label, onUpdate = _a.onUpdate, onChange = _a.onChange, _b = _a.containerStyle, containerStyle = _b === void 0 ? {} : _b, _c = _a.elementStyle, elementStyle = _c === void 0 ? {} : _c, _d = _a.containerClass, containerClass = _d === void 0 ? "" : _d, _e = _a.style, style = _e === void 0 ? {} : _e, _f = _a.className, className = _f === void 0 ? "" : _f, rest = __rest(_a, ["error", "label", "onUpdate", "onChange", "containerStyle", "elementStyle", "containerClass", "style", "className"]);
    var onValueUpdate = function (e) {
        onChange && onChange(e);
        onUpdate(e.target.name, e.target.value);
    };
    return (jsx_runtime_1.jsxs("div", __assign({ className: className + " " + containerClass + " " + ((error === null || error === void 0 ? void 0 : error.errorClass) || ""), style: __assign(__assign(__assign({}, containerStyle), ((error === null || error === void 0 ? void 0 : error.errorStyle) || {})), style) }, { children: [jsx_runtime_1.jsx("label", __assign({ htmlFor: rest.id || rest.name }, { children: label }), void 0),
            (error === null || error === void 0 ? void 0 : error.messagePosition) === types_1.FBErrorPositons.TOP && (jsx_runtime_1.jsx("span", { children: error.message }, void 0)),
            jsx_runtime_1.jsx("input", __assign({ id: rest.id || rest.name, style: elementStyle, onChange: onValueUpdate }, rest), void 0),
            (error === null || error === void 0 ? void 0 : error.messagePosition) === types_1.FBErrorPositons.BOTTOM && (jsx_runtime_1.jsx("span", { children: error.message }, void 0))] }), void 0));
};
exports.default = FBInput;
