import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FB from '..';
import { FBConfigElement, FBElement, FBElementTypes } from '../types';

describe('<FB/>', () => {
    const renderWithoutChildren = (
        formElements: FBConfigElement[] = [],
        initialData: Record<string, unknown> = {},
    ) => {
        render(
            <FB onDataChange={() => null} formElements={formElements} initialData={initialData}></FB>,
        );
    };
    describe('Rendering', () => {
        it('should render a form element', () => {
            renderWithoutChildren();
            const form = screen.queryByRole('form');
            expect(form).not.toBeNull();
        });

        it('should render react elements passed in formElements array props', () => {
            const placeholderText = 'dummy placeholder';
            const reactElement = <input key="dummy-input" placeholder={placeholderText} />;
            renderWithoutChildren([reactElement]);
            const form = screen.getByRole('form');
            expect(within(form).queryByPlaceholderText(placeholderText)).not.toBeNull();
        });

        it('should render react elements returned by a function passed in formElements array props', () => {
            const placeholderText = 'dummy placeholder';
            const functionElement = () => {
                const reactElement = <input key="dummy-input" placeholder={placeholderText} />;
                return reactElement;
            };
            renderWithoutChildren([functionElement]);
            const form = screen.getByRole('form');
            expect(within(form).queryByPlaceholderText(placeholderText)).not.toBeNull();
        });

        describe('object type formElements', () => {
            it('should render label and input elements specified by a javascript object with element and name properties', () => {
                const label = 'Name of element';
                const placeholder = 'dummy placeholder';
                const elementObject: FBElement = {
                    element: FBElementTypes.Input,
                    name: 'dummy-name',
                    label,
                    placeholder,
                };
                renderWithoutChildren([elementObject]);
                const form = screen.getByRole('form');
                expect(within(form).queryByLabelText(label)).not.toBeNull();
                expect(within(form).queryByPlaceholderText(placeholder)).not.toBeNull();
            });
            it('should render select elements specified by a javascript object with element, name and options properties', () => {
                const label = 'Name of element';
                const testId = 'test-id';
                const elementObject: FBElement = {
                    element: FBElementTypes.Select,
                    name: 'dummy-name',
                    label,
                    'data-testid': testId,
                    options: [
                        {
                            label: 'option 1',
                            value: 'option 1',
                        },
                    ],
                };
                renderWithoutChildren([elementObject]);
                const form = screen.getByRole('form');
                expect(within(form).queryByLabelText(label)).not.toBeNull();
                expect(within(form).queryByTestId(testId)).not.toBeNull();
            });
            it('should render select elements specified by a javascript object with element, name and options properties', () => {
                const label = 'Name of element';
                const testId = 'test-id';
                const elementObject: FBElement = {
                    element: FBElementTypes.Select,
                    name: 'dummy-name',
                    label,
                    'data-testid': testId,
                    options: [
                        {
                            label: 'option 1',
                            value: 'option 1',
                        },
                    ],
                };
                renderWithoutChildren([elementObject]);
                const form = screen.getByRole('form');
                expect(within(form).queryByLabelText(label)).not.toBeNull();
                expect(within(form).queryByTestId(testId)).not.toBeNull();
            });
            it('should render label and textarea elements specified by a javascript object with element and name properties', () => {
                const label = 'Name of element';
                const placeholder = 'dummy placeholder';
                const elementObject: FBElement = {
                    element: FBElementTypes.TextArea,
                    name: 'dummy-name',
                    label,
                    placeholder,
                };
                renderWithoutChildren([elementObject]);
                const form = screen.getByRole('form');
                expect(within(form).queryByLabelText(label)).not.toBeNull();
                expect(within(form).queryByPlaceholderText(placeholder)).not.toBeNull();
            });
        });

        it('should render form children within the form element', () => {
            const dummyContent = 'Dummy content';
            render(
                <FB onDataChange={() => null} formElements={[]}>
                    {dummyContent}
                </FB>,
            );
            const form = screen.getByRole('form');

            expect(within(form).queryByText(dummyContent)).not.toBeNull();
        });
    });
    describe('formData', () => {
        it('it should correctly type in an input element', () => {
            const label = 'Dummy input';
            const elementObject: FBElement = {
                element: FBElementTypes.Input,
                name: 'dummy-name',
                label,
            };
            renderWithoutChildren([elementObject]);
            const form = screen.getByRole('form');
            const field = within(form).getByLabelText(label);
            userEvent.type(field, 'My name is');
            expect(within(form).getByLabelText(label)).toHaveValue('My name is');
        });
        it('it should correctly select an option in a select element', () => {
            const label = 'Dummy select';
            const elementObject: FBElement = {
                element: FBElementTypes.Select,
                name: 'dummy-name',
                label,
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
            const form = screen.getByRole('form');
            const field = within(form).getByLabelText(label);
            userEvent.selectOptions(field, 'option 1');
            expect((within(form).getByRole('option', { name: 'option 1' }) as HTMLOptionElement).selected).toBeTruthy();
            expect((within(form).getByRole('option', { name: 'option 2' }) as HTMLOptionElement).selected).toBeFalsy();
        });
        it('it should correctly type in an textarea element', () => {
            const label = 'Dummy textarea';
            const elementObject: FBElement = {
                element: FBElementTypes.TextArea,
                name: 'dummy-name',
                label,
            };
            renderWithoutChildren([elementObject]);
            const form = screen.getByRole('form');
            const field = within(form).getByLabelText(label);
            userEvent.type(field, 'My name is');
            expect(within(form).getByLabelText(label)).toHaveValue('My name is');
        });
        it('it should correctly display initial data', () => {
            const inputlabel = 'Dummy input';
            const selectlabel = 'Dummy select';
            const textarealabel = 'Dummy textarea';
            const elementObjects: FBElement[] = [
                {
                    element: FBElementTypes.Input,
                    name: 'dummy-input',
                    label: inputlabel,
                },
                {
                    element: FBElementTypes.Select,
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
                    element: FBElementTypes.TextArea,
                    name: 'dummy-textarea',
                    label: textarealabel,
                },
            ];
            const initialData = {
                'dummy-input': 'Input value',
                'dummy-select': 'option 1',
                'dummy-textarea': 'textarea value',
            };
            renderWithoutChildren(elementObjects, initialData);
            const form = screen.getByRole('form');
            const inputField = within(form).getByLabelText(inputlabel);
            expect(inputField).toHaveValue(initialData['dummy-input']);
            const selectField = within(form).getByLabelText(selectlabel);
            expect(selectField).toHaveValue(initialData['dummy-select']);
            const textareaField = within(form).getByLabelText(textarealabel);
            expect(textareaField).toHaveValue(initialData['dummy-textarea']);
        });
        it('it should correctly call onDataChange when user types in an input element', () => {
            const label = 'Dummy input';
            const elementObject: FBElement = {
                element: FBElementTypes.Input,
                name: 'dummy-name',
                label,
            };
            const onDataChange = jest.fn();
            render(<FB onDataChange={onDataChange} formElements={[elementObject]}></FB>);
            const field = screen.getByLabelText(label);
            expect(onDataChange).toHaveBeenCalledTimes(0);
            userEvent.type(field, 'test');
            expect(onDataChange).toHaveBeenCalledTimes(4);
            expect(onDataChange).toHaveBeenLastCalledWith({ 'dummy-name': 'test' });
        });
        it('it should correctly call onDataChange when user types in a textarea element', () => {
            const label = 'Dummy textarea';
            const elementObject: FBElement = {
                element: FBElementTypes.TextArea,
                name: 'dummy-name',
                label,
            };
            const onDataChange = jest.fn();
            render(<FB onDataChange={onDataChange} formElements={[elementObject]}></FB>);
            const field = screen.getByLabelText(label);
            expect(onDataChange).toHaveBeenCalledTimes(0);
            userEvent.type(field, 'test');
            expect(onDataChange).toHaveBeenCalledTimes(4);
            expect(onDataChange).toHaveBeenLastCalledWith({ 'dummy-name': 'test' });
        });
        it('it should correctly call onDataChange when user selects an option on a select element', () => {
            const label = 'Dummy select';
            const elementObject: FBElement = {
                element: FBElementTypes.Select,
                name: 'dummy-name',
                label,
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
            const onDataChange = jest.fn();
            render(<FB onDataChange={onDataChange} formElements={[elementObject]}></FB>);
            const field = screen.getByLabelText(label);
            expect(onDataChange).toHaveBeenCalledTimes(0);
            userEvent.selectOptions(field, 'option 1');
            expect(onDataChange).toHaveBeenCalledTimes(1);
            expect(onDataChange).toHaveBeenLastCalledWith({ 'dummy-name': 'option 1' });
        });
    });
});
