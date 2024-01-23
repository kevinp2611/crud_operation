// import Details from "../userDetails/detaiils";
import NoFound from "./NoFound";
import { useNavigate } from "react-router-dom";
import { user } from "./userContext";
import { useContext, useMemo, useState } from "react";
import { msg } from "./MsgContext";
import Pagination from "./Pagination.js";

const List = ({ searchText, handleEdit, isPaginated,listHeading }) => {
  let navigate = useNavigate();
  const { submittedData, setSubmittedData, searchData,setSortConfig,sortConfig } = useContext(user);
 
  const { setIsdone, setColor } = useContext(msg);
  const [pagePeople, setPagePeople] = useState([]);
  const pageLimit = 2;

  const handleDelete = (index) => {
    const ans = window.confirm("are you sure ");
    if (ans) {
      const updatedData = submittedData.filter((data) => data.id !== index);
      setSubmittedData(updatedData);
      setIsdone("Item Deleted");
      setColor("red");
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    console.log("hey hoe", key);
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  var sortedBooks = [];
  sortedBooks = [...pagePeople];
  if (sortConfig !== null) {
    sortedBooks.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  return useMemo(
    () => (
      <div>
        <h2>{listHeading}</h2>

        <table>
          <thead>
            <tr>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("name")}
              >
                Name
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("email")}
              >
                Email
              </th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {(searchText.current.value !== "" && searchData.length === 0) ||
            submittedData.length === 0 ? (
              <div>
                <NoFound />
              </div>
            ) : (
              (Object.values(searchData).length > 0
                ? Object.values(searchData)
                : sortedBooks.length > 0
                ? sortedBooks
                : pagePeople
              ).map((data, index) => (
                <tr>
                  <td> {data.name}</td>

                  <td>{data.email}</td>
                  <td>
                    <button type="button" onClick={() => handleEdit(data)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(data.id)}>
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/user-detail`, { state: { userData: data } })
                      }
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* <ul>
          {(searchText.current.value !== "" && searchData.length === 0) ||
        //   submittedData.length === 0 ? (
        //     <div>
        //       {" "}
        //       <NoFound />
        //     </div>
        //   ) : (
        //     (Object.values(searchData).length > 0
        //       ? Object.values(searchData)
        //       : pagePeople
        //     ).map((data, index) => (
        //       <li key={index}>
        //         {`Name: ${data.name}, Email: ${data.email}`}
        //         <button type="button" onClick={() => handleEdit(data)}>
        //           Edit
        //         </button>
        //         <button type="button" onClick={() => handleDelete(data.id)}>
        //           Delete
        //         </button>
        //         <button
        //           type="button"
        //           onClick={() =>
        //             navigate(`/user-detail`, { state: { userData: data } })
        //           }
        //         >
        //           Details
        //         </button>
        //       </li>
        //     ))
        //   )}
        // </ul> */}

        {isPaginated && (
          <Pagination
            items={submittedData}
            pageLimit={pageLimit}
            setPageItems={setPagePeople}
          />
        )}
      </div>
    ),
    [submittedData, searchData, pagePeople, sortConfig]
  );
};
export default List;
