import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { UserModel } from '../../../shared/models/user.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})
export class ListUsersComponent implements OnInit  {
  usersList: UserModel[] = [];
  constructor(private userService: UserService) {}

 ngOnInit(): void {
     this.getAllUsers();
 }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      {
        next : res =>{
          console.log ('list of users', res);
        },
        error : err =>{
          console.log ('error', err);
        },
      }
    )
  }
}
