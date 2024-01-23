import { createContext, useMemo, useState } from "react";

const user = createContext();

const UserContext = ({ children }) => {
  const [submittedData, setSubmittedData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const userData = useMemo(
    () => ({
      submittedData,
      setSubmittedData,
      searchData,
      setSearchData,
      sortConfig,
      setSortConfig
    }),
    [submittedData, searchData,sortConfig]
  );

  return <user.Provider value={userData}>{children}</user.Provider>;
};
export { user, UserContext };
