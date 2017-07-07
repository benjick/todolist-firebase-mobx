import Route from 'route-parser';
import {extendObservable, computed} from 'mobx';

class Router {
  constructor(routes, notFound) {
    extendObservable(this, {
      routes: [],
      currentPath: window.location.pathname,
      notFound: null,
      current: computed(() => {
        console.log('this.computeCurrent()', this.computeCurrent());
        return this.computeCurrent();
      }),
      params: computed(() => {
        console.log('this.current.params', this.current.params);
        return this.current.params;
      }),
    });
    this.loadRoutes(routes, notFound);
  }

  computeCurrent() {
    const found = this.routes.find(item => item.route.match(this.currentPath));
    if (found) {
      console.log(
        'found.route.match(this.currentPath)',
        found.route.match(this.currentPath),
      );
      return {
        component: found.component,
        params: found.route.match(this.currentPath),
      };
    }
    return {component: this.notFound, params: {}};
  }

  loadRoutes(routes, notFound = null) {
    this.routes = routes.map(route => ({
      ...route,
      route: new Route(route.route),
    }));
    this.notFound = notFound;
  }

  go(url) {
    console.log('go');
    if (url !== window.location.pathname) {
      window.history.pushState({}, '', url);
    }
    console.log('to');
    this.currentPath = url;
  }
}

export default Router;
