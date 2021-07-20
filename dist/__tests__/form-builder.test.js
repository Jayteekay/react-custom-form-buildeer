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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("@testing-library/jest-dom");
var react_1 = require("@testing-library/react");
var user_event_1 = __importDefault(require("@testing-library/user-event"));
var __1 = __importDefault(require(".."));
var types_1 = require("../types");
describe('<FB/>', function () {
    var renderWithoutChildren = function (formElements, initialData) {
        if (formElements === void 0) { formElements = []; }
        if (initialData === void 0) { initialData = {}; }
        react_1.render(jsx_runtime_1.jsx(__1.default, { onDataChange: function () { return null; }, formElements: formElements, initialData: initialData }, void 0));
    };
    describe('Rendering', function () {
        it('should render a form element', function () {
            renderWithoutChildren();
            var form = react_1.screen.queryByRole('form');
            expect(form).not.toBeNull();
        });
        it('should render react elements passed in formElements array props', function () {
            var placeholderText = 'dummy placeholder';
            var reactElement = jsx_runtime_1.jsx("input", { placeholder: placeholderText }, "dummy-input");
            renderWithoutChildren([reactElement]);
            var form = react_1.screen.getByRole('form');
            expect(react_1.within(form).queryByPlaceholderText(placeholderText)).not.toBeNull();
        });
        it('should render react elements returned by a function passed in formElements array props', function () {
            var placeholderText = 'dummy placeholder';
            var functionElement = function () {
                var reactElement = jsx_runtime_1.jsx("input", { placeholder: placeholderText }, "dummy-input");
                return reactElement;
            };
            renderWithoutChildren([functionElement]);
            var form = react_1.screen.getByRole('form');
            expect(react_1.within(form).queryByPlaceholderText(placeholderText)).not.toBeNull();
        });
        describe('object type formElements', function () {
            it('should render label and input elements specified by a javascript object with element and name properties', function () {
                var label = 'Name of element';
                var placeholder = 'dummy placeholder';
                var elementObject = {
                    element: types_1.FBElementTypes.Input,
                    name: 'dummy-name',
                    label: label,
                    placeholder: placeholder,
                };
                renderWithoutChildren([elementObject]);
                var form = react_1.screen.getByRole('form');
                expect(react_1.within(form).queryByLabelText(label)).not.toBeNull();
                expect(react_1.within(form).queryByPlaceholderText(placeholder)).not.toBeNull();
            });
            it('should render select elements specified by a javascript object with element, name and options properties', function () {
                var label = 'Name of element';
                var testId = 'test-id';
                var elementObject = {
                    element: types_1.FBElementTypes.Select,
                    name: 'dummy-name',
                    label: label,
                    'data-testid': testId,
                    options: [
                        {
                            label: 'option 1',
                            value: 'option 1',
                        },
                    ],
                };
                renderWithoutChildren([elementObject]);
                var form = react_1.screen.getByRole('form');
                expect(react_1.within(form).queryByLabelText(label)).not.toBeNull();
                expect(react_1.within(form).queryByTestId(testId)).not.toBeNull();
            });
            it('should render select elements specified by a javascript object with element, name and options properties', function () {
                var label = 'Name of element';
                var testId = 'test-id';
                var elementObject = {
                    element: types_1.FBElementTypes.Select,
                    name: 'dummy-name',
                    label: label,
                    'data-testid': testId,
                    options: [
                        {
                            label: 'option 1',
                            value: 'option 1',
                        },
                    ],
                };
                renderWithoutChildren([elementObject]);
                var form = react_1.screen.getByRole('form');
                expect(react_1.within(form).queryByLabelText(label)).not.toBeNull();
                expect(react_1.within(form).queryByTestId(testId)).not.toBeNull();
            });
            it('should render label and textarea elements specified by a javascript object with element and name properties', function () {
                var label = 'Name of element';
                var placeholder = 'dummy placeholder';
                var elementObject = {
                    element: types_1.FBElementTypes.TextArea,
                    name: 'dummy-name',
                    label: label,
                    placeholder: placeholder,
                };
                renderWithoutChildren([elementObject]);
                var form = react_1.screen.getByRole('form');
                expect(react_1.within(form).queryByLabelText(label)).not.toBeNull();
                expect(react_1.within(form).queryByPlaceholderText(placeholder)).not.toBeNull();
            });
        });
        it('should render form children within the form element', function () {
            var dummyContent = 'Dummy content';
            react_1.render(jsx_runtime_1.jsx(__1.default, __assign({ onDataChange: function () { return null; }, formElements: [] }, { children: dummyContent }), void 0));
            var form = react_1.screen.getByRole('form');
            expect(react_1.within(form).queryByText(dummyContent)).not.toBeNull();
        });
    });
    describe('formData', function () {
        it('it should correctly type in an input element', function () {
            var label = 'Dummy input';
            var elementObject = {
                element: types_1.FBElementTypes.Input,
                name: 'dummy-name',
                label: label,
            };
            renderWithoutChildren([elementObject]);
            var form = react_1.screen.getByRole('form');
            var field = react_1.within(form).getByLabelText(label);
            user_event_1.default.type(field, 'My name is');
            expect(react_1.within(form).getByLabelText(label)).toHaveValue('My name is');
        });
        it('it should correctly select an option in a select element', function () {
            var label = 'Dummy select';
            var elementObject = {
                element: types_1.FBElementTypes.Select,
                name: 'dummy-name',
                label: label,
                options: [
                    {
                        label: 'option 2',
                        value: 'option 2',
                    },
                    {
                        label: 'option 1',
                        value: 'option 1',
                    },
                ],
            };
            renderWithoutChildren([elementObject]);
            var form = react_1.screen.getByRole('form');
            var field = react_1.within(form).getByLabelText(label);
            user_event_1.default.selectOptions(field, 'option 1');
            expect(react_1.within(form).getByRole('option', { name: 'option 1' }).selected).toBeTruthy();
            expect(react_1.within(form).getByRole('option', { name: 'option 2' }).selected).toBeFalsy();
        });
        it('it should correctly type in an textarea element', function () {
            var label = 'Dummy textarea';
            var elementObject = {
                element: types_1.FBElementTypes.TextArea,
                name: 'dummy-name',
                label: label,
            };
            renderWithoutChildren([elementObject]);
            var form = react_1.screen.getByRole('form');
            var field = react_1.within(form).getByLabelText(label);
            user_event_1.default.type(field, 'My name is');
            expect(react_1.within(form).getByLabelText(label)).toHaveValue('My name is');
        });
        it('it should correctly display initial data', function () {
            var inputlabel = 'Dummy input';
            var selectlabel = 'Dummy select';
            var textarealabel = 'Dummy textarea';
            var elementObjects = [
                {
                    element: types_1.FBElementTypes.Input,
                    name: 'dummy-input',
                    label: inputlabel,
                },
                {
                    element: types_1.FBElementTypes.Select,
                    name: 'dummy-select',
                    label: selectlabel,
                    options: [
                        {
                            label: 'option 2',
                            value: 'option 2',
                        },
                        {
                            label: 'option 1',
                            value: 'option 1',
                        },
                    ],
                },
                {
                    element: types_1.FBElementTypes.TextArea,
                    name: 'dummy-textarea',
                    label: textarealabel,
                },
            ];
            var initialData = {
                'dummy-input': 'Input value',
                'dummy-select': 'option 1',
                'dummy-textarea': 'textarea value',
            };
            renderWithoutChildren(elementObjects, initialData);
            var form = react_1.screen.getByRole('form');
            var inputField = react_1.within(form).getByLabelText(inputlabel);
            expect(inputField).toHaveValue(initialData['dummy-input']);
            var selectField = react_1.within(form).getByLabelText(selectlabel);
            expect(selectField).toHaveValue(initialData['dummy-select']);
            var textareaField = react_1.within(form).getByLabelText(textarealabel);
            expect(textareaField).toHaveValue(initialData['dummy-textarea']);
        });
        it('it should correctly call onDataChange when user types in an input element', function () {
            var label = 'Dummy input';
            var elementObject = {
                element: types_1.FBElementTypes.Input,
                name: 'dummy-name',
                label: label,
            };
            var onDataChange = jest.fn();
            react_1.render(jsx_runtime_1.jsx(__1.default, { onDataChange: onDataChange, formElements: [elementObject] }, void 0));
            var field = react_1.screen.getByLabelText(label);
            expect(onDataChange).toHaveBeenCalledTimes(0);
            user_event_1.default.type(field, 'test');
            expect(onDataChange).toHaveBeenCalledTimes(4);
            expect(onDataChange).toHaveBeenLastCalledWith({ 'dummy-name': 'test' });
        });
        it('it should correctly call onDataChange when user types in a textarea element', function () {
            var label = 'Dummy textarea';
            var elementObject = {
                element: types_1.FBElementTypes.TextArea,
                name: 'dummy-name',
                label: label,
            };
            var onDataChange = jest.fn();
            react_1.render(jsx_runtime_1.jsx(__1.default, { onDataChange: onDataChange, formElements: [elementObject] }, void 0));
            var field = react_1.screen.getByLabelText(label);
            expect(onDataChange).toHaveBeenCalledTimes(0);
            user_event_1.default.type(field, 'test');
            expect(onDataChange).toHaveBeenCalledTimes(4);
            expect(onDataChange).toHaveBeenLastCalledWith({ 'dummy-name': 'test' });
        });
        it('it should correctly call onDataChange when user selects an option on a select element', function () {
            var label = 'Dummy select';
            var elementObject = {
                element: types_1.FBElementTypes.Select,
                name: 'dummy-name',
                label: label,
                options: [
                    {
                        label: 'option 2',
                        value: 'option 2',
                    },
                    {
                        label: 'option 1',
                        value: 'option 1',
                    },
                ],
            };
            var onDataChange = jest.fn();
            react_1.render(jsx_runtime_1.jsx(__1.default, { onDataChange: onDataChange, formElements: [elementObject] }, void 0));
            var field = react_1.screen.getByLabelText(label);
            expect(onDataChange).toHaveBeenCalledTimes(0);
            user_event_1.default.selectOptions(field, 'option 1');
            expect(onDataChange).toHaveBeenCalledTimes(1);
            expect(onDataChange).toHaveBeenLastCalledWith({ 'dummy-name': 'option 1' });
        });
    });
});
