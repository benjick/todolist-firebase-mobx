import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import './App.css';

class App extends Component {
  render() {
    const Route = this.props.router.current.component;
    const todos = this.props.todos.lists;
    const {router} = this.props;
    return (
      <div className="App">
        {todos.map(list =>
          <button
            key={`todo/${list.id}`}
            onClick={() => router.go(`/todo/${list.id}`)}>
            {list.title}
          </button>,
        )}
        <hr />
        <button onClick={() => router.go('/')}>Home</button>
        <button onClick={() => router.go('/todo/123')}>Todo</button>
        <button onClick={() => router.go('/123')}>404</button>
        <hr />
        <Route />
      </div>
    );
  }
}

export default inject('router', 'todos')(observer(App));
