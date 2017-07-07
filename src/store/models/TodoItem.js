import {types} from 'mobx-state-tree';
import {ref} from '../../firebase';

const listRef = ref.child('lists');

const Todo = types.model(
  'Todo',
  {
    id: '',
    title: types.string,
    done: false,
    parent: '',
    get ref() {
      return listRef.child(this.parent).child('items').child(this.id);
    },
  },
  {
    toggle() {
      this.ref.update({done: !this.done});
    },
    remove() {
      if (this.done) {
        this.ref.remove();
      }
    },
  },
);

export default Todo;
