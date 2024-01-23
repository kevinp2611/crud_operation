import React, { useState,useEffect } from "react";

function usePagination(items, pageLimit,setPageItems) {
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = Math.ceil(items.length / pageLimit);
  console.log("item",items)

//   const changePage = (pageNumber) => {
//     setPageNumber(pageNumber);
//   };

    const s = pageNumber * pageLimit;
    const e = s + pageLimit;
    
   
        console.log(s,e,items.slice(s, e))
      
  useEffect(() => {
    setPageItems(items.slice(s, e));
  }, [pageNumber,items]);

 


  const nextPage = () => {
    setPageNumber(Math.min(pageNumber + 1, pageCount - 1));
  };

  const previousPage = () => {
    setPageNumber(Math.max(pageNumber - 1, 0));
  };

  return {
    pageNumber,
    pageCount,
    nextPage,
    previousPage,
  };
}

export default usePagination;