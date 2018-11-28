import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object';

@inject(Router, User)
export class Users {
  constructor(router, users) {
    this.router = router;
    this.users = users;
    this.message = 'Users';
    this.showUserEditForm = false;
  }

  newUser() {
    this.user = {
      firstName: '',
      lastName: '',
      active: true,
      role: 'user',
      email: '',
      password: ''
    };
    this.showUserEditForm = true;
  }
  async save(){
    if(this.user && this.user.firstName && this.user.lastName 
      && this.user.email && this.user.password)
      await this.users.saveUser(this.user);
      }
    }
  }
