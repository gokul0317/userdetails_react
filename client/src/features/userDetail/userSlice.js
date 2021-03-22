import {
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios'

const URL = 'http://localhost:5000'
const END_POINT = 'api/userdetail'

export const userDetailSlice = createSlice({
    name: 'userdetail',
    initialState: {
        userDetails: [],
        loading: false,
        currentUser: {},
    },
    reducers: {
        loadingState: (state, action) => {
            state.loading = action.payload
        },
        setUserDetails: (state, action) => {
            state.userDetails = [...action.payload]
        },
        addUserData: (state, action) => {
            state.userDetails = [...state.userDetails, action.payload]
        },
        updateUserData: (state, action) => {
            const index = state.userDetails.findIndex((elm) => elm._id === action.payload._id)
            if (index !== -1) {
                let newData = [...state.userDetails]
                newData[index] = action.payload
                state.userDetails = [...newData]
            }
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        removeUser: (state, action) => {
            state.userDetails = state.userDetails.filter((elm) => elm._id !== action.payload)
        },
    },
});

export const {
    loadingState,
    setUserDetails,
    updateUserData,
    addUserData,
    removeUser,
    setCurrentUser,
} = userDetailSlice.actions;

export const getAllUsersData = () => async dispatch => {
    dispatch(loadingState(true))
    try {
        const resp = await axios.get(`${URL}/${END_POINT}/list/all`)
        dispatch(setUserDetails(resp.data.data))
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(loadingState(false))
    }
}

export const addUsersData = (userData) => async dispatch => {
    dispatch(loadingState(true))
    try {
        const resp = await axios.post(`${URL}/${END_POINT}`, userData)
        dispatch(addUserData(resp.data.data))
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(loadingState(false))
    }
}

export const deleteUser = (userData) => async dispatch => {
    dispatch(loadingState(true))
    try {
        const resp = await axios.delete(`${URL}/${END_POINT}${userData.id}`, userData)
        dispatch(deleteUser(userData.id))
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(loadingState(false))
    }
}

export const updateUsersData = (userData) => async dispatch => {
    dispatch(loadingState(true))
    try {
        const resp = await axios.put(`${URL}/${END_POINT}/${userData._id}`, userData)
        dispatch(updateUserData(resp.data.data))
        dispatch(setCurrentUser(resp.data.data))
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(loadingState(false))
    }
}

export const getCurrentUser = (userData) => async dispatch => {
    dispatch(loadingState(true))
    try {
        const resp = await axios.get(`${URL}/${END_POINT}/${userData}`)
        dispatch(setCurrentUser(resp.data.data))
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(loadingState(false))
    }
}


export const getAllUsers = state => {
    return state.userDetail
};


export default userDetailSlice.reducer;
