import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import uuid from 'uuid';

import './App.css';
import Axios from 'axios';

class App extends React.Component {
  state = {
    todos: [

// EXAMPLE of how to make http request:


      // {
      //   // uuid is a random id generator, v4 is version
      //   id: uuid.v4(),
      //   title: 'Take out trash',
      //   completed: false
      // },
      // {
      //   id: 2,
      //   title: 'Dinner with wife',
      //   completed: true
      // },
      // {
      //   id: 3,
      //   title: 'Meeting with boss',
      //   completed: false
      // }
    ]
  }

  // didMount
  componentDidMount(){
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data}))
  }

  //Toggle complete

  markComplete = (id) => {
    this.setState( { todos: this.state.todos.map(todo=> { 
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    })})
  }

  // Delete Todo
delTodo = (id) => {
  Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
  .then(res=> this.setState({ todos: [...this.state.todos.filter(todo => todo.id
    !== id)] }));
}

// Add Todo
addTodo = (title) => {
  Axios.post('https://jsonplaceholder.typicode.com/todos', 
  {title: title ,
    completed:false
  })
  .then(res=>this.setState({ todos: [...this.state.todos, res.data] }));
  
}

  render(){
    return (
      <Router>
        <div className="App">
          <div className = 'container'>
            <Header />
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo = {this.addTodo} />
                <Todos todos = {this.state.todos} markComplete = {this.markComplete}
                delTodo = {this.delTodo} />
              </React.Fragment>
            )} />
            <Route path = '/about' component ={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
