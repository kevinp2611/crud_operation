import { userConstant } from "../constants";
import array from "../tableHeader";

const initState = {
  userData: [],
  searchdata: [],
  pagePeople: [],
  searchtext: "",
  pageNumber: 0,
  pageLimit: 2,
  page: "basic",
  sortConfig: { key: null, direction: null },
  error: {},
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userConstant.SET_USER:
      return { ...state, userData: action.payload };

    case userConstant.EDIT_USER:
      const edituser = action.payload.newState;
      let updatedData = { ...state.userData[action.payload.index] };
      let cloneUserData = [...state.userData];

      for (const key in edituser) {
        typeof updatedData[key] === "object"
          ? (updatedData[key] = { ...updatedData[key], ...edituser[key] })
          : (updatedData[key] = edituser[key]);
      }
      cloneUserData[action.payload.index] = updatedData;

      return { ...state, userData: cloneUserData };

    case userConstant.DELETE_USER:
      console.log("delete", state);
      const removeList = state.userData.filter(
        (data) => data.id !== action.payload
      );
      return { ...state, userData: removeList };

    // case userConstant.SEARCH_USER:

    //   const filterData = state.searchtext
    //     ? Object.values(state.userData).filter((user) => {
    //         return (
    //           user.name.toLowerCase().includes(state.searchtext) ||
    //           user.email.toLowerCase().includes(state.searchtext)
    //         );
    //       })
    //     : [];
    //   return { ...state, searchdata: filterData };

    // case userConstant.SET_SEARCHTEXT:
    //   const filterData = action.payload.value
    //     ? Object.values(state.userData).filter((user) => {
    //         return (
    //           user.name.toLowerCase().includes(action.payload.value) ||
    //           user.email.toLowerCase().includes(action.payload.value)
    //         );
    //       })
    //     : [];

    //   return {
    //     ...state,
    //     searchtext: action.payload,
    //     [action.payload.tmpStoreName]: filterData,
    //   };

    case userConstant.SET_PAGEPEOPLE:
      let result = state.userData;
      const pageLimit = state.pageLimit;
      const searchText = action.payload.searchText;
      const tmpName = action.payload.tmpStoreName;
      const s = state.pageNumber * pageLimit;
      const e = s + pageLimit;
      if (searchText) {
        result = searchText
          ? Object.values(state.userData).filter((user) => {
              return (
                user.name.toLowerCase().includes(searchText) ||
                user.email.toLowerCase().includes(searchText)
              );
            })
          : [];
      }
      var results = result.slice(s, e);

      if (action.payload.key !== null && action.payload.direction !== null) {
        const key = action.payload.key;
        const datatype = typeof array[key].defaultValue;

        results.sort((a, b) => {
          var titleA;
          var titleB;

          if (datatype === "number") {
            titleA = a[key];
            titleB = b[key];
          }

          if (datatype === "string") {
            titleA = a[key].toLowerCase();
            titleB = b[key].toLowerCase();
          }
          if (datatype === "date") {
            titleA = new Date(a[key]);
            titleB = new Date(b[key]);
          }

          if (titleA < titleB) {
            return action.payload.direction === "ascending" ? -1 : 1;
          }
          if (titleA > titleB) {
            return action.payload.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }

      return {
        ...state,
        searchtext: searchText,
        [tmpName]: results,
        sortConfig: {
          key: action.payload.key,
          direction: action.payload.direction,
        },
      };

    case userConstant.SET_PAGENUMBER:
      return { ...state, pageNumber: action.payload };

    case userConstant.SET_PAGE:
      return { ...state, page: action.payload };

    case userConstant.SET_ERROR:
      return {
        ...state,

        error: {
          ...state.error,
          [action?.payload?.name]: action?.payload?.err,
        },
      };

    default:
      return state;
  }
};
