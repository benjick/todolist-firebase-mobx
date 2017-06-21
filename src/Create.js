import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {ref} from './firebase';

class Create extends Component {
  state = {
    name: '',
  };

  createTodoList() {
    const result = ref.child('lists').push({
      title: this.state.name,
    });
    const key = result.key;
    this.props.router.go(`/todo/${key}`);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={e => this.setState({name: e.target.value})}
          value={this.state.name}
          placeholder="Optional title"
        />
        <button onClick={() => this.createTodoList()}>Create</button>
      </div>
    );
  }
}

export default inject('router')(observer(Create));
