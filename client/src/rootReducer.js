import { combineReducers } from 'redux'
import { todosReducer } from './features/todos'

const reducers = combineReducers({
    todosReducer
})

export default reducers