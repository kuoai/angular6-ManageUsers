import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnAdd:boolean = true
  constructor(
    public flashMessage: FlashMessagesService,
    public router: Router,
    public userService: UserService
  ) {}
  // 使用验证失败的方法
  // showFlash() {
  //   this.flashMessage.show('验证失败', { cssClass: 'alert-success', timeout: 2000 });
  // }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: User, valid: boolean}) {
    // console.log(value);
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMessage.show('请填写正确的完整信息！', { cssClass: 'alert-danger', timeout: 2000 });
      // console.log('验证失败！');
      this.router.navigate(['add-user']);
    } else {

      this.userService.newUser(value).subscribe(user => {
        this.flashMessage.show('用户添加成功！', { cssClass: 'alert-success', timeout: 2000 });
        this.router.navigate(['/']);
      });

      // console.log('验证成功！');
    }
  }

}
