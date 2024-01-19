import { createContext, useMemo, useState } from "react";

const user = createContext();

const UserContext = ({ children }) => {
  const [submittedData, setSubmittedData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const userData = useMemo(
    () => ({
      submittedData,
      setSubmittedData,
      searchData,
      setSearchData,
    }),
    [submittedData, searchData]
  );

  return <user.Provider value={userData}>{children}</user.Provider>;
};
export { user, UserContext };
