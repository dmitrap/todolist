import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODOLIST, addTodolistAC, SET_TODOLISTS, setTodolistsAC, DELETE_TODOLIST, deleteTodolistAC} from "./reducer";
import axios from "axios";
class App extends React.Component {

    nextTodoListId = 0;

    state = {
        todolists: []
    }

    addTodoList = (title) => {

        axios.post("https://social-network.samuraijs.com/api/1.0/todo-lists",
            {title},
            {
                withCredentials: true,
                headers: {"API-KEY": "cb639962-3e44-46b0-9334-cee00898e185"}
            })
            .then((res) => {
                //res.data.data.item
                this.props.addTodolist(res.data.data.item)
            })

        // let newTodoList = {
        //     id: this.nextTodoListId,
        //     title: title
        // }
        //
        // this.props.addTodolist(newTodoList);/*
        //
        // this.setState({todolists: [...this.state.todolists, newTodoList]}, () => {
        //     this.saveState();
        // });
        //
        // this.nextTodoListId++;*/
    }

    componentDidMount() {
        this.restoreState();
    }


    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.0/todo-lists", {withCredentials: true})
            .then(res => {
                this.props.setTodolists(res.data);
            });
    }


    render = () => {
        const todolists = this.props
            .todolists
            .map(tl => <TodoList id={tl.id} title={tl.title} tasks={tl.tasks} />)

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
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodolist) => {
            const action = addTodolistAC(newTodolist);
            dispatch(action)
        },
        setTodolists: (todolists) => {
            const action = setTodolistsAC(todolists);
            dispatch(action)
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

