// import Details from "../userDetails/detaiils";
import NoFound from "./NoFound";
import { useNavigate } from "react-router-dom";
import { Pagination } from "./Pagination.js";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../actions/user.action.js";
import { useMemo } from "react";

const List = ({
  searchText,
  buttonRef,
  elementsRef,
  isPaginated,
  listHeading,
}) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, searchtext, searchdata, pageNumber,userpagePeople,sortConfig } = useSelector(
    (state) => state.users
  );
console.log("userpagePeople", userpagePeople)
  const pageLimit = 2;
  // const s = pageNumber * pageLimit;
  // const e = s + pageLimit;

  const handleDelete = (index) => {
    const ans = window.confirm("are you sure ");
    if (ans) {
      dispatch(userAction.deleteUserData(index));
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
   
   
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
    direction = "descending";
    }
    // sortConfig.key=key;
    // sortConfig.direction=direction;
    const  tmpStoreName='userpagePeople'

    dispatch(userAction.setpagepeople(tmpStoreName, searchtext,key,direction ));
  };

  const handleEdit = (data) => {
    elementsRef.current["name"].current.value = data.name;
    elementsRef.current["email"].current.value = data.email;
    elementsRef.current["id"].current.value = data.id;
    buttonRef.current.innerText = "Edit";
  };

  return (
    <div>
      <h2>{listHeading}</h2>

      {/* <table>
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
            userData.length === 0 ? (
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
        </table> */}

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
              <th
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("rating")}
              >
                Rating
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("date")}
              >
                Date
              </th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
        {(userpagePeople  === undefined || !userpagePeople.length) && (
          <div>
            <NoFound />
          </div>
        )}
        {userpagePeople && userpagePeople.map(
          (data, index) => (
            <tr>
            <td> {data.name}</td>

            <td>{data.email}</td>
            
            <td>&nbsp;&nbsp;{data.rating}</td>

            <td>&nbsp;&nbsp;{data.date}</td>
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
          )
        )}
    </tbody>
        </table> 

      {isPaginated && <Pagination items={userData} pageLimit={pageLimit} tmpStoreName={'userpagePeople'}/>}
    </div>
  );
};
export default List;
