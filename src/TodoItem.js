import React, {Component} from 'react';
import {observer} from 'mobx-react';
import './TodoItem.css';

class TodoItem extends Component {
  render() {
    const {item} = this.props;
    return (
      <div>
        {item.done
          ? <span className="done">{item.title}</span>
          : <span>{item.title}</span>}
        <button onClick={() => item.toggle()}>Toggle</button>
        <button onClick={() => item.remove()} disabled={!item.done}>
          Delete
        </button>
      </div>
    );
  }
}

export default observer(TodoItem);
