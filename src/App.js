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
  const username = useRef("");

  const handleSubmit =  (e) => {
    e.preventDefault();
    const index = submittedData.findIndex((x) => x.id === formData.current.id);
    let newState = [...submittedData];
const blank ={
  name :formData.current.name.value,
  email: formData.current.email.value
}

    if (index > -1) {
      newState[index] = {
        ...newState[index],
        name: blank.name,
        email: blank.email,
      };
    } else {
      console.log("formdata",blank)
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
    formData.current.id = 0;
    formData.current.name.value = "";
    formData.current.email.value = "";
    e.target.reset();
  };

  const handleEdit = (data) => {
    // Set the form data and editIndex when "Edit" button is clicked
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
    const filterData = Object.values(submittedData).filter((user) => {
      return user.name.includes(value) || user.email.includes(value);
    });
    setSearchData(filterData);
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
    console.log("formdata",formData,value)
  };

  return (
    <div>
      {console.log(formData, submittedData, searchData)}
      <h1>Form Component</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            // onBlur={handlename}
           
            name="name"
            id="name"
            defaultValue={formData?.current?.name?.value}
            // onChange={(e) => {
            //   formData.current.name = e.target.value;
            // }}
            onChange={handlevalidate}
          />
        </label>
        {/* {formData.current.name.error ? (
            <h1>{formData.current.name.error}</h1>
            ) : (
              ""
            )} */}
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            id="email"
            defaultValue={formData?.current?.email?.value}
            // onChange={(e) => {
            //   formData.current.email = e.target.value;
            // }}
            onChange={handlevalidate}
          />
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
      {/* < button type="button" onClick={handleSearch}> button</button> */}

      <h2>Submitted Data:</h2>
      <ul>
        {(Object.values(searchData).length > 0 ? Object.values(searchData) : submittedData).map(
          (data, index) => (
            <li key={index}>
              {`Name: ${data.name}, Email: ${data.email}`}
              <button type="button" onClick={() => handleEdit(data)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(data.id)}>
                Delete
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;
