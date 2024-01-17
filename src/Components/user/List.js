// import Details from "../userDetails/detaiils";
import NoFound from "./NoFound";
import { useNavigate } from "react-router-dom";

const List = ({
  optimizedFn,
  searchData,
  submittedData,
  handleEdit,
  handleDelete,
  searchText,
}) => {


  let navigate = useNavigate(); 
 

  return (
    <div>
      {/* <input
        type="text"
        name="searchTerm"
        onChange={(e) => optimizedFn(e.target.value)}
      /> */}
      <h2>Submitted Data:</h2>
      <ul>
        {(searchText.current.value !== "" && searchData.length === 0) ||
        submittedData.length === 0 ? (
          <div>
            {" "}
            <NoFound />
          </div>
        ) : (
          (Object.values(searchData).length > 0
            ? Object.values(searchData)
            : submittedData
          ).map((data, index) => (
            <li key={index}>
              {`Name: ${data.name}, Email: ${data.email}`}
              <button type="button" onClick={() => handleEdit(data)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(data.id)}>
                Delete
              </button>
              <button type="button" onClick= {() =>navigate(`/user-detail`,{ state: {userData: data} })}>
                Details
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default List;
