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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_2 = __importStar(require("react"));
var FBInput_1 = __importDefault(require("./subcomponents/FBInput"));
var fb_select_1 = __importDefault(require("./subcomponents/FBSelect/fb-select"));
var fb_text_area_1 = __importDefault(require("./subcomponents/FBTextArea/fb-text-area"));
var types_1 = require("./types");
var FB = function (_a) {
    var children = _a.children, formElements = _a.formElements, initialData = _a.initialData, resetToken = _a.resetToken, onDataChange = _a.onDataChange, onSubmit = _a.onSubmit, containerStyle = _a.containerStyle, containerClass = _a.containerClass, elementStyle = _a.elementStyle, formProps = __rest(_a, ["children", "formElements", "initialData", "resetToken", "onDataChange", "onSubmit", "containerStyle", "containerClass", "elementStyle"]);
    var _b = react_2.useState({}), fbData = _b[0], setFbData = _b[1];
    var updateData = function (name, value) {
        setFbData(function (oldData) {
            var _a;
            return (__assign(__assign({}, oldData), (_a = {}, _a[name] = value, _a)));
        });
    };
    var refreshData = function () {
        if (initialData) {
            setFbData(initialData);
        }
        else {
            setFbData({});
        }
    };
    var handleFormSubmit = function (e) {
        e.preventDefault();
        onSubmit && onSubmit(e);
    };
    react_2.useEffect(function () {
        if (Object.keys(fbData).length > 0)
            onDataChange(fbData);
    }, [fbData]);
    react_2.useEffect(refreshData, [resetToken]);
    var renderFormElement = function (configElement) {
        if (!configElement) {
            return;
        }
        if (react_2.default.isValidElement(configElement)) {
            return configElement;
        }
        if (configElement instanceof Function) {
            return configElement(function (overrideData) { return setFbData(function (fbData) { return (__assign(__assign({}, fbData), overrideData)); }); }, fbData);
        }
        var _a = configElement, element = _a.element, name = _a.name, properties = __rest(_a, ["element", "name"]);
        switch (element) {
            case types_1.FBElementTypes.Input:
                return (react_1.createElement(FBInput_1.default, __assign({}, properties, { containerStyle: containerStyle, containerClass: containerClass, elementStyle: elementStyle, onUpdate: updateData, key: element + name, name: name, value: fbData[name] || '' })));
            case types_1.FBElementTypes.Select:
                return (react_1.createElement(fb_select_1.default, __assign({}, properties, { containerStyle: containerStyle, containerClass: containerClass, elementStyle: elementStyle, onUpdate: updateData, key: element + name, name: name, value: fbData[name] || '' })));
            case types_1.FBElementTypes.TextArea:
                return (react_1.createElement(fb_text_area_1.default, __assign({}, properties, { containerStyle: containerStyle, containerClass: containerClass, elementStyle: elementStyle, onUpdate: updateData, key: element + name, name: name, value: fbData[name] || '' })));
        }
    };
    return (jsx_runtime_1.jsxs("form", __assign({ role: "form", onSubmit: handleFormSubmit }, formProps, { children: [formElements.map(function (el) { return renderFormElement(el); }), children] }), void 0));
};
exports.default = FB;
