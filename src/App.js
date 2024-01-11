// import logo from './logo.svg';
import "./App.css";
import React, { useRef, useState, useCallback } from "react";

function App() {
  const formData = useRef({
    id: 0,
    name: {
      value: "",
      error: "",
    },

    email: {
      value: "",
      error: "",
    },
  });

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

  const [submittedData, setSubmittedData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  // const [Text, setText] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handlevalidate = ({ target }) => {
    const { name, value } = target;
    const field = validationSchema[name];
    let error = "";
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

    formData.current[name].value = value;
    formData.current[name].error = error;
    var element1 = document.getElementById(name);
    const inputField = document.getElementsByName(name)[0];
    if (error) {
      element1.style.display = "block";
      element1.style.color = "red";
      inputField.style.borderColor = "red";
    } else {
      element1.style.display = "none";
      inputField.style.borderColor = "";
    }
  };

  // const isvalidate = () => {
  //   const haserror = Object.keys(formData.current).filter(
  //     (val) => formData.current[val]?.error
  //   );
  //   return haserror?.length > 0;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!isvalidate()) {
    const index = submittedData.findIndex((x) => x.id === formData.current.id);
    let newState = [...submittedData];
    const blank = {
      name: formData.current.name.value,
      email: formData.current.email.value,
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
          id: submittedData.length + 1,
          name: blank.name,
          email: blank.email,
        },
      ];
    }

    setSubmittedData(newState);
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    formData.current.id = 0;
    formData.current.name.value = "";
    formData.current.email.value = "";
    e.target.reset();
  };

  const handleEdit = (data) => {
    formData.current.name.value = data.name;
    formData.current.email.value = data.email;
    formData.current.id = data.id;
    setIsUpdate(!isUpdate);
  };

  const handleDelete = (index) => {
    // Remove the entry from the submittedData array when "Delete" button is clicked
    const updatedData = submittedData.filter((data) => data.id !== index);
    setSubmittedData(updatedData);
  };

  // const filteredUsers = React.useMemo(
  //   () =>
  //     submittedData.filter((user) => {
  //       console.log("Filter function is running ..."); // this gets logged only when the search keyword changes
  //       return user.name.includes(searchTerm);
  //     }),
  //   [searchTerm]
  // );

  // const handletext = (e) => {
  //   setsearchterm(e.target.value);
  // };

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

  const handleChange = (value) => {
    setTimeout(() => {
      console.log("value", value, Object.values(submittedData).length)      
      const filterData = Object.values(submittedData).filter((user) => {
        return user.name.includes(value) || user.email.includes(value);
      });
      setSearchData(filterData);
    }, 1000);
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  //   const hadlevalidation = ()=>{

  //     const name = username.current.value

  // const test  = /[a-zA-z]+$/.test(name) && name.trim() !=='';

  //     // {formData.current.name  ? <p style={{ color: 'red' }}>Name is required</p> : null}
  //     if(test)
  //     {
  //      alert("name is nt crrect");
  //     }
  //   }

  // var isvalidate = Object.values(formData).filter(function (val) {
  //   console.log("testing validate",val.name.error)
  //   return (val.name.error !==" " );
  // }).length > 0;

  return (
    <div>
      {console.log(formData, submittedData, searchData)}
      <h1>Form Component</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            // ref={formData.current.name}

            name="name"
            // defaultValue=""
            defaultValue={formData?.current?.name?.value}
            // onChange={(e) => {
            //   formData.current.name = e.target.value;
            // }}
            onChange={handlevalidate}
          />
        </label>

        <div id="name" style={{ display: "none" }}>
          please provide valid name
        </div>

        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            // id="email"

            defaultValue={formData?.current?.email?.value}
            onChange={handlevalidate}
          />
          <div id="email" style={{ display: "none" }}>
            please provide valid email
          </div>
        </label>
        <input type="hidden" name="id" value={formData?.current?.id}></input>
        <br />
        <button type="submit">
          {formData?.current?.id !== 0 ? "Update" : "Create"}
        </button>
      </form>

      <input
        type="text"
        name="searchTerm"
        onChange={(e) => optimizedFn(e.target.value)}
      />

      <h2>Submitted Data:</h2>
      <ul>
        {(Object.values(searchData).length > 0
          ? Object.values(searchData)
          : submittedData
        ).map((data, index) => (
          <li key={index}>
            {`Name: ${data.name}, Email: ${data.email}`}
            <button type="button" onClick={() => handleEdit(data)}>
              Edit
            </button>
            <button type="button" onClick={() => handleDelete(data.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
