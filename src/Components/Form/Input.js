import { forwardRef } from "react";

const Input = forwardRef(function Input(props, ref) {
  const { inputRef, errorRef } = ref;
  const { label, id, handleChange, ...otherProps } = props;
  console.log(errorRef);
  return (
    <div>
      <label>
        {label}
        <input
          id={id}
          {...otherProps}
          ref={inputRef}
          onChange={handleChange}
          onBlur={handleChange}
        />
      </label>
      <div ref={errorRef} id={`${id}_error`} style={{ display: "none" }}></div>
    </div>
  );
});

export default Input;
