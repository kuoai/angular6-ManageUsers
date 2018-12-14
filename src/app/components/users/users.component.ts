import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];
  totalOwed: number;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    // 调用请求方法
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      // console.log(users);

      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    let total = 0;
    for (let i = 0; i < this.users.length; i++) {
      total += parseFloat(this.users[i].balance);
    }
    this.totalOwed = total;
  }
}
