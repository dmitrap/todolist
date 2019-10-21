import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import connect from "react-redux/es/connect/connect";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();

    }

    nextTaskId = 0;

    state = {
        filterValue: "All"
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state" + this.props.id, stateAsString);
    }

    addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextTaskId++;
        this.props.addTask(this.props.id, newTask);
    }


    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        });
    }

    changeTask = (taskId, obj) => {
        this.props.changeTask(this.props.id, taskId, obj)
    }
    removeTask = (taskId) => {
        this.props.removeTask(this.props.id, taskId)
    }
    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone});
    }
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    }


    render = () => {

        return (

            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle title={this.props.title}/>
                    <button onClick={() => {
                        this.props.removeTodo(this.props.id)
                    }}>X</button>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>

                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               removeTask={this.removeTask}
                               tasks={this.props.tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.isDone === false;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.isDone === true;
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (todolistId, newTask) => {
            const action = {
                type: "ADD-TASK",
                todolistId: todolistId,
                newTask: newTask
            };
            dispatch(action)
        },

        changeTask: (todolistId, taskId, obj) => {
            const action = {
                type: "CHANGE-TASK",
                todolistId: todolistId,
                taskId: taskId,
                obj: obj
            };
            dispatch(action)
        },

        removeTask: (todolistId, taskId) => {
            const action = {
                type: "REMOVE-TASK",
                todolistId: todolistId,
                taskId: taskId
            };
            dispatch(action)
        },

    }
}

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodoList;

