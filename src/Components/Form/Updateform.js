import formArray from "./formArray";

import { createRef, useEffect, useMemo, useRef, useState } from "react";

import Input from "./Input";
import RadioButton from "./RadioButton";
import Checkbox from "./Checkbox";

import SelectInp from "./SelectInp";
import dataArray from "./dataArray";
import validationSchema from "./validationSchema";

const Upadateform = () => {
  const [page, setPage] = useState("basic");
  const [isChange, setIsChange] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  let formRef = useRef({});
  const elementsRef = useRef(
    useMemo(
      () =>
        Object.keys(formArray).reduce((m, o) => {
          formArray[o].map((i) => {
            i.hasOwnProperty("radioGroup")
              ? i.radioGroup.map((r) => (m[r.id] = createRef()))
              : (m[i.name] = createRef());
          });
          return m;
        }, []),
      []
    )
  );
  const elementsErrorRef = useRef(
    useMemo(
      () =>
        Object.keys(formArray).reduce((m, o) => {
          formArray[o].map((i) => {
            i.hasOwnProperty("radioGroup")
              ? i.radioGroup.map((r) => (m[`${r.id}_error`] = createRef()))
              : (m[`${i.name}_error`] = createRef());
          });
          return m;
        }, []),
      []
    )
  );

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validate = () => {
    const isValue = formArray[page].filter((item) =>
      formRef.current[item.name] ? formRef.current[item.name] === "" : true
    );

    const isError = formArray[page].filter(
      (item) =>
        elementsErrorRef.current[`${item.name}_error`] &&
        elementsErrorRef.current[`${item.name}_error`]?.current?.innerHTML &&
        elementsErrorRef.current[`${item.name}_error`]?.current?.innerHTML !==
          ""
    );
    console.log("isvalue", isValue.length > 0, isValue);
    console.log("iserror", isError.length > 0);
    console.log("final", isError.length > 0 || isValue.langth > 0);

    setIsDisabled(isValue.length > 0 || isError.length > 0);

    return isValue.length > 0 || isError.langth > 0;
  };

  let position = Object.keys(formArray).indexOf(page);
  let size = Object.keys(formArray).length;

  const handleSubmit = () => {
    alert(JSON.stringify(formRef.current));
  };

  const handleNext = () => {
    position = position + 1;
    if (position < size) {
      const nextPage = Object.keys(formArray)[position];
      setPage(nextPage);
    }
  };

  const handlePrev = () => {
    position = position - 1;
    if (position > -1) {
      const prevPage = Object.keys(formArray)[position];
      setPage(prevPage);
    }
  };
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    formRef.current[name] = type === "checkbox" ? checked : value;
    if (type === "select-one") {
      setIsChange(!isChange);
    }

    const field = validationSchema[name];
    let pass = document.getElementById("password")?.value;
    let confirm_pass = document.getElementById("confirm_password")?.value;
    var err = "";

    if (name === "confirm_password") {
      if (pass !== confirm_pass) {
        err = "password must be same ";
        //  dispatch(userAction.setError(name, err));
        elementsErrorRef.current[`${name}_error`].current.innerHTML = err;
        elementsErrorRef.current[`${name}_error`].current.style.display =
          "block";
      } else {
        elementsErrorRef.current[`${name}_error`].current.innerHTML = err;
        elementsErrorRef.current[`${name}_error`].current.style.display =
          "block";
      }
    }

    if (field?.required) {
      if (!value) {
        err = "This field is required.";
        elementsErrorRef.current[`${name}_error`].current.innerHTML = err;
        elementsErrorRef.current[`${name}_error`].current.style.display =
          "block";
      } else {
        if (field?.validator?.regEx) {
          if (!field.validator.regEx.test(value)) {
            err = field.validator.error;
            elementsErrorRef.current[`${name}_error`].current.innerHTML = err;
            elementsErrorRef.current[`${name}_error`].current.style.display =
              "block";
          } else {
            elementsErrorRef.current[`${name}_error`].current.innerHTML = err;
            elementsErrorRef.current[`${name}_error`].current.style.display =
              "block";
          }
        }
      }
    }
    validate();
  };
  useEffect(() => {
    validate();
  }, [page, validate]);
  return (
    <div>
      {Object?.keys(formArray).map((item) => (
        <span style={{ color: page === item ? "red" : "" }} key={item}>
          {capitalizeFirstLetter(item)}
        </span>
      ))}

      <div>
        {formArray[page].map((pageItem) => {
          if (pageItem.type === "radio") {
            return (
              <RadioButton
                key={pageItem.name}
                ref={elementsRef.current}
                id={pageItem.name}
                label={pageItem.label}
                radioGroup={pageItem.radioGroup}
                handleChange={handleChange}
                defaultChecked={formRef.current[pageItem.name]}
              />
            );
          } else if (pageItem.type === "select") {
            return (
              <SelectInp
                ref={elementsRef.current[pageItem]}
                name={pageItem.name}
                key={pageItem.name}
                label={pageItem.label}
                placeholder={pageItem.placeholder}
                data={dataArray}
                handleChange={handleChange}
                formRef={formRef.current}
              />
            );
          } else if (pageItem.type === "checkbox") {
            return (
              <Checkbox
                key={pageItem.name}
                ref={elementsRef.current[pageItem.name]}
                id={pageItem.name}
                label={pageItem.label}
                name={pageItem.name}
                type={pageItem.type}
                handleChange={handleChange}
                defaultChecked={formRef.current[pageItem.name]}
              />
            );
          } else {
            return (
              <Input
                key={pageItem.name}
                ref={{
                  inputRef: elementsRef.current[pageItem.name],
                  errorRef: elementsErrorRef.current[`${pageItem.name}_error`],
                }}
                id={pageItem.name}
                label={pageItem.label}
                name={pageItem.name}
                type={pageItem.type}
                placeholder={pageItem.placeholder}
                handleChange={handleChange}
                defaultValue={formRef.current[pageItem.name]}
              />
            );
          }
        })}
      </div>
      <div>
        <button
          type="button"
          onClick={() => handlePrev()}
          style={position === 0 ? { display: "none" } : { display: "" }}
        >
          Prev
        </button>
        {console.log(isDisabled, "test-data")}
        <button
          type="button"
          onClick={() => handleNext()}
          style={position === size - 1 ? { display: "none" } : { display: "" }}
          disabled={isDisabled}
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => handleSubmit()}
          style={
            position === size - 1 ? { display: "inline" } : { display: "none" }
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default Upadateform;
