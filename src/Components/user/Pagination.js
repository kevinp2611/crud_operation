import React, { useEffect,useState,useMemo } from "react";
import usePagination from "./usePagination.js";

const Pagination = (props) => {
    
  const { pageNumber, pageCount, nextPage, previousPage } =
    usePagination(props.items, props.pageLimit,props.setPageItems);

  return (
    <div>
        
      <button id="prev" onClick={previousPage} disabled={pageNumber>0?false:true}>Prev</button>
    
      <button id="next" onClick={nextPage} disabled={pageNumber+1<pageCount?false:true}>Next</button>
    </div>
  )
};

export default Pagination;