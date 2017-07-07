import {autorun} from 'mobx';
import {onSnapshot} from 'mobx-state-tree';
import Store from './models/TodoStore';
import router from './router';

const store = Store.create();

store.createTodoList('New one');
store.createTodoList('Second');

autorun(() => console.log(router.current));

onSnapshot(store, snapshot => {
  console.dir(snapshot);
});

export default store;
