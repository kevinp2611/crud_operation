import { useContext, useCallback, useMemo } from "react";
import { user } from "./userContext";

const Search = ({ searchText }) => {
  const { submittedData, setSearchData } = useContext(user);

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

  return useMemo(
    () => (
      <>
        {console.log("search")}
        <input
          type="text"
          name="searchTerm"
          ref={searchText}
          onChange={(e) => optimizedFn(e.target.value)}
        />
      </>
    ),
    [optimizedFn]
  );
};
export default Search;
