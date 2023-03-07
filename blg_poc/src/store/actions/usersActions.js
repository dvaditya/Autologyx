import { getAllUsers } from 'api/users.api';

export const setUsers = () => async dispatch => {
    try {
        const userList = await getAllUsers()
        dispatch({
            type: "SET_USERS",
            payload: userList
        })
    } catch(e) {
        console.log(e)
        dispatch({
            type: "SET_USERS",
            payload: []
        })
    }
    
}   