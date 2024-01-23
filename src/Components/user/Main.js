import List from "./List";
import Table from "./Table";

import Search from "./search";
import Msg from "./Msg";

import { useRef, useMemo, createRef, useContext } from "react";
import { user } from "./userContext";
import { msg } from "./MsgContext";

const User = () => {
  const { submittedData, searchData, setSubmittedData } = useContext(user);
  const { setIsdone, setColor } = useContext(msg);

  const buttonRef = useRef();
  const searchText = useRef("");

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

  const validate = useRef({
    name: "true",
    email: "true",
  });

  const isvalidate = () => {
    const haserror = Object.keys(validate.current).filter(
      (val) => validate.current[val] === "true"
    );
    return haserror.length > 0;
  };

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
        setColor("blue");
        setIsdone("item is Edited");
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
        setColor("green");
        setIsdone("item is added");
      }
      setSubmittedData(newState);

      e.target.reset();
    }
  };

  const handleEdit = (data) => {
    elementsRef.current["name"].current.value = data.name;
    elementsRef.current["email"].current.value = data.email;
    elementsRef.current["id"].current.value = data.id;

    buttonRef.current.innerText = "Edit";
  };

  return useMemo(
    () => (
      <>
        {console.log("submittedData", submittedData)}

        <Msg />

        <Table
          inputArray={inputArray}
          buttonRef={buttonRef}
          elementsRef={elementsRef}
          handleSubmit={handleSubmit}
          validate={validate}
          isvalidate={isvalidate}
          isPaginated={true}
        />

        <Search searchText={searchText} />

        <List searchText={searchText} handleEdit={handleEdit} isPaginated={true} listHeading={"Submitted Data:"}/>
      </>
    ),
    [submittedData, searchData]
  );
};
export default User;
