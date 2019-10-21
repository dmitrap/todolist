import {createStore} from "redux";


const initialState = {
    "todolists": []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case "ADD-TODO": {
            return {
                ...state,
                todolists: [...state.todolists, action.newToDoList]
            }
        }


        //
        case "REMOVE-TODO": {
            return {
                ...state,
                todolists: [...state.todolists, action.removeToDoList]
            }
        }
        //

        case "ADD-TASK": {
            return {
                ...state,
                todolists: state.todolists.map((todolist) => {
                    if (todolist.id === action.todolistId) {
                        return {
                            ...todolist,
                            tasks: [...todolist.tasks, action.newTask]
                        }
                    } else {
                        return todolist
                    }
                })
            }
        }

        case "CHANGE-TASK" : {
            return {
                ...state,
                todolists: state.todolists.map(todolist => {
                    if (todolist.id === action.todolistId) {
                        return {
                            ...todolist,
                            tasks: todolist.tasks.map(task => {
                                if (task.id === action.taskId) {
                                    return {...task, ...action.obj}
                                } else {
                                    return task
                                }
                            })
                        }
                    } else {
                        return todolist
                    }
                })
            }
        }

        //
        case "REMOVE-TASK": {
            return {
                ...state,
                todolists: state.todolists.map((todolist) => {
                    if (todolist.id === action.todolistId) {
                        return {
                            ...todolist,
                            tasks: [...todolist.tasks, action.newTask]
                        }
                    } else {
                        return todolist
                    }
                })
            }
        }
        //

        default:
            return state
    }
};

const store = createStore(reducer);

export default store;