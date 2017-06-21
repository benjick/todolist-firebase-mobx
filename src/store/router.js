import Route from 'route-parser';
import {extendObservable, computed} from 'mobx';

class Router {
  constructor(routes, notFound) {
    extendObservable(this, {
      routes: [],
      currentPath: window.location.pathname,
      notFound: null,
      current: computed(() => this.computeCurrent()),
      params: computed(() => this.current.params),
    });
    this.loadRoutes(routes, notFound);
  }

  computeCurrent() {
    const found = this.routes.find(item => item.route.match(this.currentPath));
    if (found) {
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
    if (url !== window.location.pathname) {
      window.history.pushState({}, '', url);
    }
    this.currentPath = url;
  }
}

export default Router;
