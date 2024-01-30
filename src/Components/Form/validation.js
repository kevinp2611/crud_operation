import { useDispatch } from "react-redux";
import { userAction } from "../../actions";
import validationSchema from "./validationSchema";
import { isValidElement } from "react";
import inputEle from "./inputEle";
import store from "../../utils/store";

const handlevalidate = ({ target }, dispatch) => {
  const { name, value } = target;
  const field = validationSchema[name];
  let pass = document.getElementById("password")?.value;
  let confirm_pass = document.getElementById("confirmpassword")?.value;
  var err = "";
  var button = document.getElementById("btn");

  if (name === "confirmpassword") {
    if (pass !== confirm_pass) {
      err = "password must be same ";
      dispatch(userAction.setError(name, err));
    } else dispatch(userAction.setError(name, err));
  }

  if (field?.required) {
    if (!value) {
      err = "This field is required.";
      dispatch(userAction.setError(name, err));
    } else {
      if (field?.validator?.regEx) {
        if (!field.validator.regEx.test(value)) {
          err = field.validator.error;
          dispatch(userAction.setError(name, err));
        } else {
          dispatch(userAction.setError(name, err));
        }
      }
    }
  }
};
export default handlevalidate;
