import List from "./List";
import Table from "./Table";
import NoFound from "./NoFound";
import Search from "./search";
import { useRef, useMemo, useState, createRef, useCallback } from "react";

const User = () => {
  const inputArray = [
    {
      key: "name",
      id: "name",
      type: "text",
      placeholder: "Enter Name",
      name: "name",
      defaultvalue: "",
    },
    {
      key: "email",
      id: "email",
      type: "text",
      placeholder: "Enter Email",
      name: "email",
      defaultvalue: "",
    },
    {
      key: "id",
      id: "id",
      type: "hidden",
      name: "id",
      defaultvalue: 0,
    },
  ];

  const [submittedData, setSubmittedData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const searchText = useRef("");
  const validate = useRef({
    name: "true",
    email: "true",
  });
  //  const validateEmail = useRef("false");
  const buttonRef = useRef();

  const elementsRef = useRef(
    useMemo(
      () =>
        inputArray.reduce((m, o) => {
          m[o.key] = createRef();
          return m;
        }, []),
      []
    )
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isvalidate()) {
      const index = submittedData.findIndex(
        (x) => x.id === elementsRef.current["id"].current.value
      );
      let newState = [...submittedData];
      const blank = {
        name: elementsRef.current["name"].current.value,
        email: elementsRef.current["email"].current.value,
      };
      if (index > -1) {
        newState[index] = {
          ...newState[index],
          name: blank.name,
          email: blank.email,
        };
      } else {
        newState = [
          ...submittedData,
          {
            id: (submittedData.length + 1).toString(),
            name: blank.name,
            email: blank.email,
          },
        ];
        buttonRef.current.innerText = "Create";
      }
      setSubmittedData(newState);

      e.target.reset();
    }
  };

  const isvalidate = () => {
    const haserror = Object.keys(validate.current).filter(
      (val) => validate.current[val] === "true"
    );
    console.log(haserror, validate);
    return haserror.length > 0;
  };

  const handleEdit = (data) => {
    elementsRef.current["name"].current.value = data.name;
    elementsRef.current["email"].current.value = data.email;
    elementsRef.current["id"].current.value = data.id;

    buttonRef.current.innerText = "Edit";
  };

  const handleDelete = (index) => {
    const ans = window.confirm("are you sure ");
    if (ans) {
      const updatedData = submittedData.filter((data) => data.id !== index);
      setSubmittedData(updatedData);
    }
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleSearch = (value) => {
    const filterData = value
      ? Object.values(submittedData).filter((user) => {
          return (
            user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value)
          );
        })
      : [];
    setSearchData(filterData);
  };

  const optimizedFn = useCallback(debounce(handleSearch), [submittedData]);

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
    console.log(isvalidate());
    if (isvalidate()) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  };

  return (
    <>
      <Table
        handleSubmit={handleSubmit}
        inputArray={inputArray}
        elementsRef={elementsRef}
        handlevalidate={handlevalidate}
        buttonRef={buttonRef}
      />

      <Search optimizedFn={optimizedFn} searchText={searchText} />

      <List
        optimizedFn={optimizedFn}
        searchData={searchData}
        searchText={searchText}
        submittedData={submittedData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};
export default User;
