import { userConstant } from "../constants";

const initState = [];

export const userReducer = (state=initState, action) => {
  

  switch (action.type) {
    case userConstant.SET_USER:
      return action.payload;
    case userConstant.EDIT_USER:
      const edituser = action.payload.newState;
      let updatedData = { ...state[action.payload.index] };
      let cloneUserData = [...state];
      console.log( "edit",edituser)
   
      for (const key in edituser ) {
        typeof updatedData[key] === 'object'
        ?updatedData[key] = { ...updatedData[key], ...edituser[key] }
        :updatedData[key] = edituser[key]
      }
      cloneUserData[action.payload.index] = updatedData;
    console.log( "last1",updatedData)
    console.log( "last",cloneUserData)
       return cloneUserData;
   
    default:
      return state;
  }
}
