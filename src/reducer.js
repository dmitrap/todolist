export const ADD_TODOLIST = "TodoList/reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "TodoList/reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/reducer/DELETE-TASK";
export const ADD_TASK = "TodoList/reducer/ADD-TASK";
export const UPDATE_TASK = "TodoList/reducer/UPDATE-TASK";

const initialState = {
    "todolists": [
        {
            "id": 0, "title": "every day",
            tasks: [
                {"title": "css11", "isDone": false, "priority": "low", "id": 0},
                {"title": "js", "isDone": false, "priority": "low", "id": 1},
                {"title": "react", "isDone": false, "priority": "low", "id": 2},
                {"title": "sasasa", "isDone": false, "priority": "low", "id": 3},
                {"title": "yoaa", "isDone": false, "priority": "low", "id": 4},
                {"title": "sddsdsds", "isDone": false, "priority": "low", "id": 5}]
        },
        {"id": 1, "title": "tomorrow", tasks: []},
        {"id": 2, "title": "weewwe`", tasks: []},
        {"id": 3, "title": "dddd", tasks: []}
    ]
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id != action.todolistId)
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id != action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            }
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            }
        case UPDATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id != action.taskId) {
                                    return t;
                                } else {
                                    return {...t, ...action.obj};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
    }
    console.log("reducer: ", action);
    return state;
}

export const addTaskAC = (newTask, todolistId) => {
    return {type: ADD_TASK, newTask, todolistId};
}

export const updateTaskAC = (taskId, obj, todolistId) => {
    return {type: UPDATE_TASK, taskId, obj, todolistId};
}

export const deleteTodolistAC = (todolistId) => {
    return {type: DELETE_TODOLIST, todolistId};
}
export const deleteTaskAC = (taskId, todolistId) => {
    return {type: DELETE_TASK, taskId, todolistId};
}

export default reducer