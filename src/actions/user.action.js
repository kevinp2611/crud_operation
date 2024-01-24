import { userConstant } from "../constants"

const setUserData = (payload) => {
    return {
        type: userConstant.SET_USER,
        payload
    }
}

const editUserData = (newState,index) => {
    return {
        type: userConstant.EDIT_USER,
        payload:{newState:newState,index:index}
    }
}
const deleteUserData = (newState,index) => {
    return {
        type: userConstant.EDIT_USER,
        payload:{newState:newState,index:index}
    }
}


export const userAction = {
    setUserData,
    editUserData
}