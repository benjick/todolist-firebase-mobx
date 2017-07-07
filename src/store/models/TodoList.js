import {types} from 'mobx-state-tree';
import {ref} from '../../firebase';
import Todo from './TodoItem';

const listRef = ref.child('lists');

const TodoList = types.model(
  'TodoList',
  {
    items: types.optional(types.array(Todo), []),
    id: types.identifier(),
    title: '',
    loading: false,
    get ref() {
      return listRef.child(this.id);
    },
  },
  {
    async afterCreate() {
      this.loading = true;
      const snapshot = await this.ref.once('value');
      const data = snapshot.val();
      this.loaded(data);
    },
    loaded(data) {
      this.title = data.title;
      this.loading = false;
      const childRef = this.ref.child('items');
      childRef.on('value', this.itemsCallback);
    },
    itemsCallback(snapshot) {
      if (!snapshot || !snapshot.val) {
        return;
      }
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

export default TodoList;
