const SelectInp = (props) => {
  return (
    <div>
      <label>Choose a {props.placeholder} </label>

      <select
        onChange={props.handlefunc}
        disabled={props.required ? false : true}
      >
        <option value="" disabled selected hidden>
          Choose a {props.placeholder}
        </option>
        {props.required &&
          Object.keys(props.data).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
};
export default SelectInp;
