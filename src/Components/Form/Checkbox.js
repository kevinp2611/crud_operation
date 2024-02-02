import { forwardRef } from "react";

const Checkbox = forwardRef(function Checkbox(props, ref) {
  const { label, handleChange, defaultChecked, ...otherProps } = props;
  return (
    <label>
      {label}
      <input
        {...otherProps}
        ref={ref}
        onChange={handleChange}
        defaultChecked={defaultChecked}
      />
    </label>
  );
});

export default Checkbox;
