import { configureStore } from '@reduxjs/toolkit'
import cartUIReducer from './reducers/cardUIReducer'
import productReducer from './reducers/productReducer'
import userReducer from './reducers/userReducer'

export const store = configureStore({
    reducer: {
        products: productReducer,
        cartUI: cartUIReducer,
        user: userReducer
    }
})