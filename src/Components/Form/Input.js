import { useDispatch, useSelector } from "react-redux";
import handlevalidate from "./validation";
import inputEle from "./inputEle";
import { useRef, useMemo, createRef } from "react";

const Input = (props) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.users);

  return (
    <label>
      {props.heading}
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        // value={formData.current[props.name]?.current?.value}
        // ref={formData.current[props.name]}
        // defaultValue={formData.current[props.name]?.current?.value}
        placeholder={props.placeholder}
        onChange={(e) => handlevalidate(e, dispatch)}
        onBlur={(e) => handlevalidate(e, dispatch)}
      />
    </label>
  );
};

export default Input;
