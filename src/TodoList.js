import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  state = {
    text: '',
  };

  componentDidMount() {
    const id = this.props.router.params.todo;
    this.props.todos.loadList(id);
    this.props.todos.set(id);
  }
  //
  // componentWillUnmount() {
  //   this.props.todos.unload();
  // }

  addTodo(todos, e) {
    e.preventDefault();
    const {text} = this.state;
    if (text.length > 0) {
      todos.add(text);
      this.setState({text: ''});
    }
  }

  render() {
    const todos = this.props.todos.current;
    if (!todos || todos.loading) {
      return <p>loading...</p>;
    }
    return (
      <div>
        <h2>{todos.title}</h2>
        <div>
          <form onSubmit={e => this.addTodo(todos, e)}>
            <input
              type="text"
              onChange={e => this.setState({text: e.target.value})}
              value={this.state.text}
              placeholder="Todo text"
            />
            <button type="submit">add</button>
          </form>
        </div>
        {todos.items.map(todo => <TodoItem key={todo.id} item={todo} />)}
      </div>
    );
  }
}

export default inject('todos', 'router')(observer(TodoList));
