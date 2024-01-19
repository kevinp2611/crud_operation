import React, {useMemo} from "react";
import { ctx } from "../../context";

const Table = ({
  inputArray,
  buttonRef,
  elementsRef,
  isvalidate,
  validate,
  handleSubmit,
}) => {
  const isText = RegExp(/^[A-Z ]{3,}$/i);
  const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  const validationSchema = {
    name: {
      required: true,
      validator: {
        regEx: isText,
        error: "Please provide a valid name",
      },
    },
    email: {
      required: true,
      validator: {
        regEx: isEmail,
        error: "Please provide a valid email",
      },
    },
  };

  const handlevalidate = ({ target }) => {
    const { name, value } = target;
    const field = validationSchema[name];
    var error = "";

    if (field.required) {
      if (!value) {
        error = "This field is required.";
      } else {
        if (field.validator.regEx) {
          if (!field.validator.regEx.test(value)) {
            error = field.validator.error;
          }
        }
      }
    }

    var element1 = document.getElementById(name);
    var button = document.getElementById("btn");
    const inputField = document.getElementsByName(name)[0];
    if (error) {
      element1.style.display = "block";
      element1.style.color = "red";
      inputField.style.borderColor = "red";
      validate.current[name] = "true";
    } else {
      element1.style.display = "none";
      inputField.style.borderColor = "";
      validate.current[name] = "false";
    }

    if (isvalidate()) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  };

  return useMemo(
    () => (
      <div>
        {console.log("form")}
        <h1>FormData </h1>
        {/* <button onClick={() => setTheme('dark')}>test</button> */}
        <form onSubmit={handleSubmit}>
          {inputArray.map((inputEle, index) => (
            <React.Fragment key={inputEle.key}>
              <div>
                <label key={inputEle.key}>
                  {index <= inputArray.length - 2 ? inputEle.name : ""}
                  <input
                    style={{ outline: "none" }}
                    key={inputEle.key}
                    type={inputEle.type}
                    name={inputEle.name}
                    defaultValue={inputEle.defaultvalue}
                    ref={elementsRef.current[inputEle.key]}
                    onChange={handlevalidate}
                    onBlur={handlevalidate}
                  />
                </label>
              </div>
              <div id={inputEle.id} style={{ display: "none" }}>
                please provide valid {inputEle.id}
              </div>
            </React.Fragment>
          ))}
          <button type="submit" id="btn" ref={buttonRef} disabled>
            {"create"}
          </button>
        </form>
      </div>
    ),
    [handleSubmit]
  );
};
export default Table;
