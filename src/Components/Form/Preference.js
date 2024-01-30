import  Input  from "./Input";
import inputEle from "./inputEle";
import { useDispatch } from "react-redux";
import { userAction } from "../../actions";

const Preference = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <br />
      {inputEle.slice(7, 9).map((item) => (
        <div>
          <Input heading={item.heading} type={item.type} />
        </div>
      ))}
      <br />
      <button onClick={() => dispatch(userAction.setpage("address"))}>
        prev
      </button>
      <button> Submit </button>
    </div>
  );
};
export default Preference;
