import List from "./List";
import Form from "./Table";
import { useRef, useMemo, createRef } from "react";

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

const User = () => {
  const buttonRef = useRef();
  const searchText = useRef("");
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

  return (
    <>
      {/* <Msg /> */}

      <Form buttonRef={buttonRef} elementsRef={elementsRef} inputArray={inputArray} />

      {/* <Search searchText={searchText} /> */}

      <List
        searchText={searchText}
        buttonRef={buttonRef}
        elementsRef={elementsRef}
        isPaginated={true}
        listHeading={"Submitted Data:"}
      />
    </>
  );
};
export default User;
