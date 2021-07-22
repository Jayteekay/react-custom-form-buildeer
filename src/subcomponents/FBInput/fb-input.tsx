import { ChangeEvent } from "react";
import { FBErrorPositons, IFBInput } from "../../types";
type genericFBElementType = { onUpdate: (name: string, value: string) => void };

const FBInput = ({
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
}: IFBInput & genericFBElementType): JSX.Element => {
  const onValueUpdate = (e: ChangeEvent<HTMLInputElement>) => {
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
      <input
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

export default FBInput;
