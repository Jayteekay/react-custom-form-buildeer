import { ChangeEvent } from "react";
import { FBErrorPositons, IFBTextArea } from "../../types";
type genericFBElementType = { onUpdate: (name: string, value: string) => void };

const FBTextArea = ({
  error,
  label,
  onUpdate,
  onChange,
  containerStyle = {},
  elementStyle = {},
  containerClass = "",
  style = {},
  className = "",
  ...rest
}: IFBTextArea & genericFBElementType): JSX.Element => {
  const onValueUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e);
    onUpdate(e.target.name, e.target.value);
  };
  return (
    <div
      className={`${className} ${containerClass} ${error?.errorClass || ""}`}
      style={{ ...containerStyle, ...(error?.errorStyle || {}), ...style }}
    >
      <label htmlFor={rest.id || rest.name}>{label}</label>
      {error?.messagePosition === FBErrorPositons.TOP && (
        <span>{error.message}</span>
      )}
      <textarea
        id={rest.id || rest.name}
        style={elementStyle}
        onChange={onValueUpdate}
        {...rest}
      />
      {error?.messagePosition === FBErrorPositons.BOTTOM && (
        <span>{error.message}</span>
      )}
    </div>
  );
};

export default FBTextArea;
