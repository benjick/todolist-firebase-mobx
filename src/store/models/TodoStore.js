import {types} from 'mobx-state-tree';
import {ref} from '../../firebase';
import TodoList from './TodoList';

const Store = types.model(
  'TodoStore',
  {
    lists: types.optional(types.array(TodoList), []),
    current: types.maybe(types.reference(TodoList)),
  },
  {
    set(id) {
      console.log('set', id);
      this.current = id;
    },
    afterCreate() {
      console.log('morning');
    },
    findList(id) {
      const find = this.lists.find(list => list.id === id);
      return find;
    },
    createTodoList(name) {
      const result = ref.child('lists').push({
        title: name,
      });
      const key = result.key;
      this.loadList(key);
      return key;
    },
    loadList(id) {
      this.lists.push({id});
    },
  },
);

export default Store;
