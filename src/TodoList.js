import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  state = {
    text: '',
  };

  componentDidMount() {
    this.props.todos.load(this.props.router.params.todo);
  }

  addTodo(e) {
    e.preventDefault();
    const {text} = this.state;
    if (text.length > 0) {
      this.props.todos.add(text);
      this.setState({text: ''});
    }
  }

  render() {
    const {todos} = this.props;
    if (todos.loading) {
      return <p>loading...</p>;
    }
    return (
      <div>
        <h2>{todos.title}</h2>
        <div>
          <form onSubmit={e => this.addTodo(e)}>
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
