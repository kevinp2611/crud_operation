import { forwardRef } from "react";

const SelectInp = forwardRef(function SelectInp(props, ref) {
  const { label, name, handleChange, placeholder, data, formRef } = props;
  return (
    <div>
      <label> {label} </label>

      <select name={name} ref={ref} onChange={handleChange}>
        <option value="">{placeholder}</option>
        {name === "country" &&
          Object.keys(data).map((item) => (
            <option
              key={item}
              value={item}
              selected={formRef["country"] === item}
            >
              {item}
            </option>
          ))}
        {name === "state" &&
          formRef["country"] &&
          data[formRef["country"]] &&
          Object.keys(data[formRef["country"]]).map((item) => (
            <option
              key={item}
              value={item}
              selected={formRef["state"] === item}
            >
              {item}
            </option>
          ))}
        {name === "city" &&
          formRef["country"] &&
          formRef["state"] &&
          data[formRef["country"]]?.[formRef["state"]].map((item) => (
            <option key={item} value={item} selected={formRef["city"] === item}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
});

export default SelectInp;
