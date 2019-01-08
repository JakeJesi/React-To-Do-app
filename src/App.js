import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/header'
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About.js'
//import uuid from 'uuid';
import './App.css';
import axios from 'axios';

class App extends Component {
  state ={
    todos:[]
  }

  componentDidMount(){
    axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.setState({todos: res.data})) //http request
  }

  //Toggle complete
  markComplete = (id) =>{
    this.setState({ todos: this.state.todos.map(todo =>{
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  //delete todo
  deleteTodo = (id) =>{
    axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`).then(res=>  this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}));

  }

  //add todo
  addTodo = (title) =>{
    axios.post('http://jsonplaceholder.typicode.com/todos', {title, complete:false}).then(res=>this.setState({todos: [...this.state.todos, res.data] }));

  }

  render() {
    console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className = "Container">
            <Header/>
            <Route exact path="/" render={props =>(
              <React.Fragment>
                <AddTodo addTodo ={this.addTodo}/>
                <Todos  todos={this.state.todos} markComplete={this.markComplete} deleteTodo={this.deleteTodo}/>
              </React.Fragment>
            )}/>
            <Route path="/about" Component={About}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
