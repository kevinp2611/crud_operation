import { forwardRef } from "react";

const RadioButton = forwardRef(function RadioButton(props, ref) {
  const { label, radioGroup, handleChange, defaultChecked } = props;
  return (
    <p key={label}>
      {label}
      {radioGroup.map((radioBtn) => {
        return (
          <label htmlFor={radioBtn.value} key={radioBtn.id}>
            <input
              ref={ref[radioBtn.id]}
              type="radio"
              id={radioBtn.id}
              name={radioBtn.name}
              value={radioBtn.value}
              onChange={handleChange}
              defaultChecked={defaultChecked === radioBtn.value}
            />
            {radioBtn.label}
          </label>
        );
      })}
    </p>
  );
});

export default RadioButton;
