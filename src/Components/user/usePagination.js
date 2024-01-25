import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../actions";
import { useCallback, useEffect } from "react";

function usePagination(items, pageLimit, tmpStoreName) {
  const dispatch = useDispatch();
  const { pageNumber, searchtext,sortConfig} = useSelector((state) => state.users);

  const pageCount = Math.ceil(items.length / pageLimit);
  

  useEffect(() => {
    console.log("searchText", searchtext)
    dispatch(userAction.setpagepeople(tmpStoreName, searchtext,sortConfig.key,sortConfig.direction));
  }, [pageNumber,items]);

  
  const nextPage = () => {
    const nxtPage = Math.min(pageNumber + 1, pageCount - 1);
    dispatch(userAction.setpagenumber(nxtPage));
  };

  const previousPage = () => {
    const prvPage = Math.max(pageNumber - 1, 0);
    dispatch(userAction.setpagenumber(prvPage));
  };

  return {
    pageNumber,
    pageCount,
    nextPage,
    previousPage,
  };
}

export default usePagination;
