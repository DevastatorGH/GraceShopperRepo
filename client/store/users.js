import axios from 'axios';

const GET_USERS = 'GET_USERS';
const TOKEN = "token"

const getUsers = (users) => {
    return {
        type: GET_USERS,
        users
    }
}

export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN)
            if(token) {
            const { data } = await axios.get('/api/users', {
                headers: {
                    authorization: token,
                }
            });
            dispatch(getUsers(data))
            }
        } catch (error) {
            console.log('Error fetching users', error)
        }
    }
}

const initialState = [];

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return action.users;
        default: 
            return state
    }
}