import { createSlice} from '@reduxjs/toolkit';
const loginSlice = createSlice({
    name: 'login',
    initialState: {logged: false, token: '', logoutDisplay: false, person: ''},
    reducers: {
        showLogout(state){state.logoutDisplay = true},
        hideLogout(state){state.logoutDisplay = false},
        setLogin(state){state.logged = true},
        setLogout(state){state.logged = false},
        setPerson(state, action){
            const newPerson = action.payload;
            state.person = newPerson;
        },
        setToken(state, action){
            const newToken = action.payload;
            state.token = newToken.token;
        }
    }
})

export const loginActions = loginSlice.actions;

export default loginSlice;