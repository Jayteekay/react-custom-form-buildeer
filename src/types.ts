import {
    CSSProperties,
    FormHTMLAttributes,
    InputHTMLAttributes,
    ReactNode,
    SelectHTMLAttributes,
    TextareaHTMLAttributes,
} from 'react';

export enum FBErrorPositons {
    TOP,
    BOTTOM,
    NONE,
}
export interface IFBError {
    message: string;
    messagePosition?: FBErrorPositons;
    errorStyle?: CSSProperties;
    errorClass?: string;
}
export enum FBElementTypes {
    Input,
    Select,
    TextArea,
    Button,
}
export interface IFBInput extends InputHTMLAttributes<HTMLInputElement> {
    element: FBElementTypes.Input;
    name: string;
    label?: string;
    error?: IFBError;
    containerStyle?: CSSProperties;
    elementStyle?: CSSProperties;
    containerClass?: string;
    'data-testid'?: string;
}
export type FBSelectOption = {
    value: string;
    label: string;
};
export interface IFBSelect extends SelectHTMLAttributes<HTMLSelectElement> {
    element: FBElementTypes.Select;
    name: string;
    options: FBSelectOption[];
    label?: string;
    error?: IFBError;
    containerStyle?: CSSProperties;
    elementStyle?: CSSProperties;
    containerClass?: string;
    'data-testid'?: string;
}
export interface IFBTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    element: FBElementTypes.TextArea;
    name: string;
    label?: string;
    error?: IFBError;
    containerStyle?: CSSProperties;
    elementStyle?: CSSProperties;
    containerClass?: string;
    'data-testid'?: string;
}
export type FBElement = IFBInput | IFBSelect | IFBTextArea;
export type FBConfigElement =
    | ReactNode
    | ((updateData?: (overrideData: Record<string, unknown>) => void, data?: Record<string, unknown>) => ReactNode)
    | FBElement;
export interface FBProps extends FormHTMLAttributes<HTMLFormElement> {
    formElements: FBConfigElement[];
    onDataChange: <Type>(newData: Type) => void;
    initialData?: Record<string, unknown>;
    resetToken?: unknown;
    containerStyle?: CSSProperties;
    elementStyle?: CSSProperties;
    containerClass?: string;
}
