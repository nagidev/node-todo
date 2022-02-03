import {ActionTypes} from './actionTypes'

export const setTodos = (todos) => {
    return {
        type: ActionTypes.SET_TODOS,
        payload: todos
    }
}

export const todosReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_TODOS:
            return {...state, todos: payload}
        default:
            return state
    }
}