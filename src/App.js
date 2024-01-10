// import logo from './logo.svg';
import "./App.css";
import React, { useRef, useState, useCallback } from "react";

function App() {
  const formData = useRef({
    id: 0,
    name: "",
    email: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  // const [Text, setText] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const index = submittedData.findIndex((x) => x.id === formData.current.id);
    let newState = [...submittedData];
    if (index > -1) {
      newState[index] = {
        ...newState[index],
        name: formData.current.name,
        email: formData.current.email,
      };
    } else {
      newState = [
        ...submittedData,
        {
          id: submittedData.length + 1,
          name: formData.current.name,
          email: formData.current.email,
        },
      ];
    }
    setSubmittedData(newState);
    formData.current.id = 0;
    formData.current.name = "";
    formData.current.email = "";
    e.target.reset();
  };

  const handleEdit = (data) => {
    // Set the form data and editIndex when "Edit" button is clicked
    formData.current.name = data.name;
    formData.current.email = data.email;
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
        console.log(context);
      }, 500);
    };
  };

  const handleChange = (value) => {
    const filterData = submittedData.filter((user) => {
      return user.name.includes(value);
    });
    setSearchData(filterData);
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  return (
    <div>
      {console.log(formData, submittedData)}
      <h1>Form Component</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={formData?.current?.name}
            onChange={(e) => {
              formData.current.name = e.target.value;
            }}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            id="email"
            defaultValue={formData?.current?.email}
            onChange={(e) => {
              formData.current.email = e.target.value;
            }}
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
        {console.log(searchData, submittedData)}
        {/* {(searchTerm.length > 0 ? filteredUsers : submittedData).map( */}
        {(searchData.length > 0 ? searchData : submittedData).map(
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
