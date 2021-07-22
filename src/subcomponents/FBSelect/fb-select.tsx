import { ChangeEvent } from "react";
import { FBErrorPositons, IFBSelect } from "../../types";
type genericFBElementType = { onUpdate: (name: string, value: string) => void };

const FBSelect = ({
  error,
  label,
  onUpdate,
  onChange,
  containerStyle = {},
  elementStyle = {},
  containerClass = "",
  style = {},
  options = [],
  className = "",
  ...rest
}: IFBSelect & genericFBElementType): JSX.Element => {
  const onValueUpdate = (e: ChangeEvent<HTMLSelectElement>) => {
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
      <select
        id={rest.id || rest.name}
        style={elementStyle}
        onChange={onValueUpdate}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error?.messagePosition === FBErrorPositons.BOTTOM && (
        <span>{error.message}</span>
      )}
    </div>
  );
};

export default FBSelect;
