import { userConstant } from "../constants";

const setUserData = (payload) => {
  return {
    type: userConstant.SET_USER,
    payload,
  };
};

const editUserData = (newState, index) => {
  return {
    type: userConstant.EDIT_USER,
    payload: { newState: newState, index: index },
  };
};
const deleteUserData = (index) => {
  return {
    type: userConstant.DELETE_USER,
    payload: index,
  };
};

const searchUserData = () => {
  return {
    type: userConstant.SEARCH_USER,
  };
};
const setsearchtext = (payload) => {
  return {
    type: userConstant.SET_SEARCHTEXT,
    payload,
  };
};
const setpagepeople = (tmpStoreName, searchText, key, direction) => {
  return {
    type: userConstant.SET_PAGEPEOPLE,
    payload: { tmpStoreName, searchText,key,direction },
  };
};
const setpagenumber = (value) => {
  return {
    type: userConstant.SET_PAGENUMBER,
    payload: value,
  };
};

export const userAction = {
  setUserData,
  editUserData,
  deleteUserData,
  searchUserData,
  setsearchtext,
  setpagepeople,
  setpagenumber,
};
