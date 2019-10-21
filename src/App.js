import React from 'react';
import './App.css';
import ConnectedTodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import connect from "react-redux/es/connect/connect";

class App extends React.Component {

    nextTodoListId = 2;


    addTodoList = (title) => {

        let newTodoList = {
            id: this.nextTodoListId,
            title: title,
            tasks: []
        }

        this.props.addTodo(newTodoList);
        this.nextTodoListId++;
    }

    removeTodo = (todolistId) => {
        this.props.removeTodolist (todolistId);
    }

    render = () => {
        const todolists = this.props
            .todolists
            .map(tl => <ConnectedTodoList id={tl.id} title={tl.title} tasks={tl.tasks} removeTodo ={this.removeTodo}/>)

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (newTodoList) => {
            const action = {
                type: "ADD-TODO",
                newToDoList: newTodoList
            };
            dispatch(action)
        },

        removeTodolist: (todolistId) => {
            const action = {
                type: "REMOVE-TODO",
                todolistId: todolistId
            };
            dispatch(action)
        }

    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;


