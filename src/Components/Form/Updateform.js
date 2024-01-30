import formArray from "./formArray";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../actions";
import { createRef, useMemo, useRef } from "react";
import inputEle from "./inputEle";

const Upadateform = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.users);
  const formData = useRef(
    useMemo(
      () =>
        inputEle.slice(0, 7).reduce((m, o) => {
          m[o.name] = createRef();
          return m;
        }, []),
      []
    )
  );
  return (
    <div>
      {console.log(formData)}
      {Object.values(formArray).map((item) => (
        <button
          style={{ color: page === item.name ? "red" : "" }}
          key={item.name}
          onClick={() => dispatch(userAction.setpage(item.name))}
        >
          {item.name}
        </button>
      ))}

      {formArray[page]?.component}
    </div>
  );
};
export default Upadateform;
