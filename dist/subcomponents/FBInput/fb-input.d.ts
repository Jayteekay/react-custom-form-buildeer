import { IFBInput } from '../../types';
declare type genericFBElementType = {
    onUpdate: (name: string, value: string) => void;
};
declare const FBInput: ({ error, label, onUpdate, onChange, containerStyle, elementStyle, containerClass, style, className, ...rest }: IFBInput & genericFBElementType) => JSX.Element;
export default FBInput;
