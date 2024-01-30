import dataArray from "./dataArray";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../actions";
import SelectInp from "./SelectInp";

const Address = () => {
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();

  const handlecountry = (e) => {
    setCountry(e.target.value);
    setState("");
    setCity("");
  };
  const handlestate = (e) => {
    setState(e.target.value);
    setCity("");
  };
  const handlecity = (e) => {
    setCity(e.target.value);
  };
  const dispatch = useDispatch();

  const button = document.getElementById("btn");
  useEffect(() => {
    if (city) button.disabled = false;
  }, [city]);

  return (
    <div>
      <SelectInp
        placeholder={"country"}
        handlefunc={handlecountry}
        required={true}
        data={dataArray}
      />

      <br />
      <SelectInp
        placeholder={"state"}
        handlefunc={handlestate}
        required={country}
        data={dataArray?.[country]}
      />
      <br />
      <SelectInp
        placeholder={"city"}
        handlefunc={handlecity}
        required={country && state}
        data={dataArray?.[country]?.[state]}
      />
      <br />

      <br />

      <button onClick={() => dispatch(userAction.setpage("basic"))}>
        prev
      </button>
      <button
        id="btn"
        onClick={() => dispatch(userAction.setpage("preference"))}
        disabled
      >
        next
      </button>
    </div>
  );
};
export default Address;
