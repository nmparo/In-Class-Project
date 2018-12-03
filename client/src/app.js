export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      },
      {
        route: 'users',
        moduleId: './modules/users',
        name: ' Users'
      }
    ]);
  }
}
