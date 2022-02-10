import loginPageReducer from './LoginPage.js'
import kalkulatorPageReducer from './KalkulatorPage.js'
import { combineReducers } from 'redux'


const rootReducer = combineReducers( {
   loginPageReducer,
   kalkulatorPageReducer
} )

export default rootReducer