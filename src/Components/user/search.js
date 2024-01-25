import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../actions";

const Search = ({ searchText }) => {
  const dispatch = useDispatch();
  const { userData,sortConfig } = useSelector((state) => state);

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
    const  tmpStoreName='userpagePeople'
    dispatch(userAction.setpagepeople(tmpStoreName, value,sortConfig.key,sortConfig.direction ));
  
 
  };

  const optimizedFn = useCallback(debounce(handleSearch), [userData]);

  return (
    <>
      {console.log("search")}
      <input
        type="text"
        name="searchTerm"
        ref={searchText}
        onChange={(e) => {
          optimizedFn(e.target.value);
        }}
      />
    </>
  );
};
export default Search;
