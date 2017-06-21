import {types} from 'mobx-state-tree';
import {ref} from '../firebase';

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

const Store = types.model(
  'TodoList',
  {
    items: types.array(Todo),
    id: '',
    title: '',
    loading: false,
    get ref() {
      return listRef.child(this.id);
    },
  },
  {
    load(id) {
      this.id = id;
      this.loading = true;
      this.items = [];
      this.ref.once('value').then(snapshot => {
        const data = snapshot.val();
        this.loaded(data);
      });
    },
    loaded(data) {
      this.title = data.title;
      this.loading = false;
      const childRef = this.ref.child('items');
      childRef.on('value', this.itemsCallback);
    },
    itemsCallback(snapshot) {
      const items = snapshot.val();
      if (items) {
        const newItems = Object.entries(items).map(([id, item]) => ({
          ...item,
          id,
          parent: this.id,
        }));
        this.items = newItems;
      } else {
        this.items = [];
      }
    },
    add(title) {
      const todo = {title, done: false};
      const childRef = this.ref.child('items');
      childRef.push(todo);
    },
  },
);

// create an instance from a snapshot
const todolist = Store.create({
  items: [
    {
      title: 'Get coffee',
    },
  ],
});

export default todolist;
