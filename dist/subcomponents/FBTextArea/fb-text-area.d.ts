import { IFBTextArea } from '../../types';
declare type genericFBElementType = {
    onUpdate: (name: string, value: string) => void;
};
declare const FBTextArea: ({ error, label, onUpdate, onChange, containerStyle, elementStyle, containerClass, style, className, ...rest }: IFBTextArea & genericFBElementType) => JSX.Element;
export default FBTextArea;
