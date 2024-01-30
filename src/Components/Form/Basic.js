import Input from "./Input";
import inputEle from "./inputEle";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../actions";
import validationSchema from "./validationSchema";
import { useState } from "react";

const Basic = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.users);
  const isvalidate = () => {
    const haserror = inputEle
      .slice(0, 7)
      .filter((item) => error?.[item?.name] !== "");
    return haserror.length > 1;
  };
  return (
    <div>
      <br />
      <br />
      {inputEle.slice(0, 7).map((item) =>
        item.type === "radio" ? (
          <div>
            {item.value.map((ele) => (
              <Input
                heading={ele?.heading}
                name={item?.name}
                type={item.type}
                value={ele.value}
              />
            ))}
          </div>
        ) : (
          <div>
            <Input
              heading={item?.heading}
              name={item?.name}
              type={item?.type}
              defaultValue={item?.defaultvalue}
              placeholder={item?.placeholder}
            />
            <br />
            {error[item.name] ? error[item.name] : ""}
          </div>
        )
      )}

      <button
        id="btn"
        onClick={() => dispatch(userAction.setpage("address"))}
        disabled={isvalidate()}
      >
        next
      </button>
    </div>
  );
};
export default Basic;
