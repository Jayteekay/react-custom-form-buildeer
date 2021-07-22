import { IFBSelect } from "../../types";
declare type genericFBElementType = {
    onUpdate: (name: string, value: string) => void;
};
declare const FBSelect: ({ error, label, onUpdate, onChange, containerStyle, elementStyle, containerClass, style, options, className, ...rest }: IFBSelect & genericFBElementType) => JSX.Element;
export default FBSelect;
