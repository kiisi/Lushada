/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from 'react'
import { rooms } from '../utils/data'

const AppStateContext = createContext(null)

const initialState = {
    rooms: localStorage.getItem("rooms") ? JSON.parse(localStorage.getItem("rooms")) : rooms,
    allRooms: localStorage.getItem("allRooms") ? JSON.parse(localStorage.getItem("allRooms")) : rooms,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    user: null,
}

const reducer = (state, action) => {
    switch(action.type){
        case "ADD_TO_CART": {
            return {
                ...state,
                cart: [action.payload, ...state.cart]
            }
        }
        case "REMOVE_FROM_CART":{
            const filteredCart = state.cart.filter(id => id !== action.payload)

            return {
                ...state,
                cart: filteredCart
            }
        }
        case "SET_USER": {
            return {
                ...state,
                user: action.payload
            }
        }
        case "ALL_ROOMS": {
            return {
                ...state,
                rooms: state.allRooms
            }
        }
        case "STANDARD_ROOMS": {
            let filteredRooms = state.allRooms.filter(rm => rm.roomType === 'Standard') 
            return {
                ...state,
                rooms: filteredRooms
            }
        }
        case "DELUXE_ROOMS": {
            let filteredRooms = state.allRooms.filter(rm => rm.roomType === 'Deluxe') 
            return {
                ...state,
                rooms: filteredRooms
            }
        }
        case "SUITE_ROOMS": {
            let filteredRooms = state.allRooms.filter(rm => rm.roomType === 'Suite') 
            return {
                ...state,
                rooms: filteredRooms
            }
        }
    }
}

export const AppStateProvider = ({children}) =>{

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        // Save the state to local storage whenever it changes
        localStorage.setItem('rooms', JSON.stringify(state.rooms));
        localStorage.setItem('allRooms', JSON.stringify(state.allRooms));
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }, [state]);

    return (
        <AppStateContext.Provider value={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppStateContext = () => useContext(AppStateContext)