import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  id: string;
  user: object;
  hsaBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  constructor(
    public route: ActivatedRoute,
    public userService: UserService,
    public flashMessageService: FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe(user => {
      // if ( user.balance > 0) {
      //   this.hsaBalance = false;
      // }
      this.user = user;
    });
  }
  // 更新
  updateBalance(id: string) {
    this.userService.updateUser(this.id, this.user).subscribe(user => {
      this.flashMessageService.show('收支已更新！', { cssClass: 'alert-success', timeout: 2000 });
      this.showBalanceUpdateInput = false;
      this.router.navigate(['/user/' + this.id]);
      // console.log(user);
    });
  }
  // 删除
  onDeleteClick() {
    if (confirm('确定要删除本条用户信息吗？')) {
      this.userService.deleteUser(this.id, this.user).subscribe( user => {
        this.flashMessageService.show('删除成功！', { cssClass: 'alert-success', timeout: 2000 });
        this.router.navigate(['/']);
      });
    }
  }

}
