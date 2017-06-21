import Router from './store/router';
import Create from './Create';
import TodoList from './TodoList';
import NotFound from './NotFound';

const routes = [
  {
    component: Create,
    route: '/',
  },
  {
    component: TodoList,
    route: '/todo/:todo',
  },
];

const router = new Router(routes, NotFound);

export default router;
