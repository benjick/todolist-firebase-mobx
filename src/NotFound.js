import React, {Component} from 'react';
import {observer} from 'mobx-react';

class NotFound extends Component {
  render() {
    return (
      <div>
        Not found
      </div>
    );
  }
}

export default observer(NotFound);
