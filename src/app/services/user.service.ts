import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }


  url = 'http://localhost:3000';

  // 获取users接口
  getUsers(): Observable<any> {
    return this.http.get(this.url + '/users');
  }

  // 新建用户
  newUser(user: User) {
    return this.http.post(this.url + '/users', user);
  }

  // 根据id获得单个用户信息
  getUser(id: string) {
    return this.http.get(this.url + '/users/' + id);
  }

  // 更新收支
  updateUser(id, user) {
    return this.http.put(this.url + '/users/' + id, user);
  }

  // 删除用户
  deleteUser(id, user) {
    return this.http.delete(this.url + '/users/' + id, user);
  }
}
